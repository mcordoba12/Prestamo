import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepo: Repository<Cliente>,  // Inyectamos el repositorio de la entidad Cliente
  ) {}

  // Crear un nuevo cliente
  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const cliente = this.clienteRepo.create(createClienteDto);  // Creamos un cliente con los datos del DTO
    return this.clienteRepo.save(cliente);  // Guardamos el cliente en la base de datos
  }

  // Obtener todos los clientes
  async findAll(): Promise<Cliente[]> {
    return this.clienteRepo.find();  // Retorna todos los clientes de la base de datos
  }

  // Obtener un cliente por su ID
  async findOne(id: number): Promise<Cliente | null> {
    return this.clienteRepo.findOne({ where: { id } });
  }

  // Actualizar los datos de un cliente
  async update(id: number, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
    const cliente = await this.findOne(id);
    if (!cliente) {
      throw new Error('Cliente no encontrado');
    }
    
    // Actualiza los datos del cliente
    Object.assign(cliente, updateClienteDto);  
    return this.clienteRepo.save(cliente);  // Guarda el cliente actualizado
  }

  // Eliminar un cliente
  async remove(id: number): Promise<void> {
    const cliente = await this.findOne(id);
    if (!cliente) {
      throw new Error('Cliente no encontrado');
    }
    await this.clienteRepo.remove(cliente);  // Elimina el cliente de la base de datos
  }
}
