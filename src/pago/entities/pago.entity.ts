import { Prestamo } from 'src/prestamo/entities/prestamo.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Pago {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Prestamo, prestamo => prestamo.pagos)
  solicitud: Prestamo;

  @Column()
  monto: number;

  @Column()
  fecha: Date;
}
