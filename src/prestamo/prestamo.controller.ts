import { Controller, Post, Param, Body, Put, HttpException, HttpStatus } from '@nestjs/common';
import { PrestamosService } from './prestamo.service';

@Controller('prestamos')
export class PrestamosController {
  constructor(private readonly prestamosService: PrestamosService) {}

  // Crear una nueva solicitud de préstamo
  @Post()
  async crearSolicitud(@Body() body: { clienteId: number; monto: number }) {
    try {
      const solicitud = await this.prestamosService.crearSolicitud(body.clienteId, body.monto);
      return {
        message: 'Solicitud de préstamo creada exitosamente',
        solicitud, // Retorna la solicitud creada
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST); // Manejo de errores
    }
  }

  // Cambiar el estado de una solicitud de préstamo
  @Put('estado/:id')
  async cambiarEstado(@Param('id') id: number, @Body() body: { estado: string }) {
    try {
      const solicitud = await this.prestamosService.cambiarEstadoSolicitud(id, body.estado);
      return {
        message: 'Estado de la solicitud actualizado correctamente',
        solicitud, // Retorna la solicitud actualizada
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST); // Manejo de errores
    }
  }

  // Registrar un pago
  @Post('pago')
  async registrarPago(@Body() body: { solicitudId: number; monto: number }) {
    try {
      const solicitud = await this.prestamosService.registrarPago(body.solicitudId, body.monto);
      return {
        message: 'Pago registrado exitosamente',
        solicitud, // Retorna la solicitud con el estado actualizado
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST); // Manejo de errores
    }
  }
}
