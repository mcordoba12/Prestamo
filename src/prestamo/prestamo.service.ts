import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prestamo } from './entities/prestamo.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Pago } from 'src/pago/entities/pago.entity';

@Injectable()
export class PrestamosService {
  constructor(
    @InjectRepository(Prestamo)
    private solicitudRepo: Repository<Prestamo>,
    @InjectRepository(Cliente)
    private clienteRepo: Repository<Cliente>,
    @InjectRepository(Pago)
    private pagoRepo: Repository<Pago>,
  ) {}

  // Crear una nueva solicitud
  async crearSolicitud(clienteId: number, monto: number): Promise<Prestamo> {
    const cliente = await this.clienteRepo.findOneOrFail({ where: { id: clienteId } });

    const nuevaSolicitud = this.solicitudRepo.create({
      cliente,
      monto,
      estado: 'Solicitado',
    });

    return this.solicitudRepo.save(nuevaSolicitud);
  }

  // Cambiar el estado de la solicitud
  async cambiarEstadoSolicitud(id: number, nuevoEstado: string): Promise<Prestamo> {
    const solicitud = await this.solicitudRepo.findOneOrFail({ where: { id } });

    // Validación de estado de la solicitud
    if (solicitud.estado === 'Rechazado' && nuevoEstado !== 'Solicitado') {
      throw new Error('Una solicitud rechazada no puede cambiar a un estado de aprobación');
    }

    // Validación para pasar de 'En Estudio' a 'Aprobado'
    if (solicitud.estado === 'En Estudio' && nuevoEstado === 'Aprobado') {
      const cliente = await this.clienteRepo.findOneOrFail({ where: { id: solicitud.cliente.id } });
      if (cliente.score_crediticio <= 700) {
        throw new Error('El score crediticio es demasiado bajo para aprobar el préstamo');
      }
    }

    solicitud.estado = nuevoEstado;
    return this.solicitudRepo.save(solicitud);
  }

  // Registrar un pago
  async registrarPago(solicitudId: number, monto: number): Promise<Prestamo> {
    const solicitud = await this.solicitudRepo.findOneOrFail({ where: { id: solicitudId } });

    if (solicitud.estado !== 'Desembolsado') {
      throw new Error('La solicitud no ha sido desembolsada o no existe');
    }

    const pago = this.pagoRepo.create({
      solicitud,
      monto,
      fecha: new Date(),  // Se puede modificar para usar un formato de fecha adecuado si es necesario
    });

    await this.pagoRepo.save(pago);

    // Verificar si el préstamo ha sido pagado completamente
    const pagosAcumulados = await this.pagoRepo
      .createQueryBuilder('pago')
      .where('pago.solicitudId = :id', { id: solicitudId })
      .select('SUM(pago.monto)', 'sum')
      .getRawOne();

    const totalPagado = pagosAcumulados?.sum || 0;

    if (totalPagado >= solicitud.monto) {
      solicitud.estado = 'Pagado';
      return this.solicitudRepo.save(solicitud);
    }

    return solicitud;
  }
}
