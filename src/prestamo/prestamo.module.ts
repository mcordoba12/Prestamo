import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prestamo } from './entities/prestamo.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Pago } from 'src/pago/entities/pago.entity';
import { PrestamosService } from './prestamo.service';
import { PrestamosController } from './prestamo.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([Prestamo, Cliente, Pago]),
  ],
  providers: [PrestamosService],
  controllers: [PrestamosController],
})
export class PrestamosModule {}
