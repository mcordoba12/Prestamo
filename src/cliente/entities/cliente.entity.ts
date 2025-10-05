import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Prestamo } from 'src/prestamo/entities/prestamo.entity';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  score_crediticio: number;

  @OneToMany(() => Prestamo, prestamo => prestamo.cliente)
  solicitudes: Prestamo[];
}
