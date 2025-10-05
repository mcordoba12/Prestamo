import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { Cliente } from './entities/cliente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cliente]),  // Asegúrate de importar la entidad Cliente
  ],
  controllers: [ClienteController],
  providers: [ClienteService],
})
export class ClienteModule {}
