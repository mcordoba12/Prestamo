import { Module } from '@nestjs/common';
import { PrestamosModule } from './prestamo/prestamo.module';  // Importar módulo de préstamos
import { ClienteModule } from './cliente/cliente.module';    // Importar módulo de clientes
import { PagoModule } from './pago/pago.module';              // Importar módulo de pagos
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './cliente/entities/cliente.entity';  // Importar entidad Cliente
import { Prestamo } from './prestamo/entities/prestamo.entity';  // Importar entidad Prestamo
import { Pago } from './pago/entities/pago.entity';            // Importar entidad Pago
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',  // Tipo de base de datos
      host: 'localhost',  // Dirección del servidor de la base de datos
      port: 5432,         // Puerto de la base de datos
      username: 'postgres',  // Nombre de usuario de la base de datos
      password: 'hola1234',  // Contraseña de la base de datos
      database: 'loan_management', // Nombre de la base de datos
      synchronize: true,  // Solo en desarrollo. En producción debería ser false
      autoLoadEntities: true,  // Esto hace que TypeORM cargue todas las entidades automáticamente
    }),
    PrestamosModule,  // Módulo de préstamos
    ClienteModule,   // Módulo de clientes
    PagoModule,      // Módulo de pagos
  ],
  controllers: [AppController],  // Controladores de la aplicación
  providers: [AppService],       // Servicios de la aplicación
})
export class AppModule {}
