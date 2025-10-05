import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Pago } from 'src/pago/entities/pago.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';


@Entity()
export class Prestamo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente, cliente => cliente.solicitudes)
  cliente: Cliente;  // Relación con Cliente: un préstamo pertenece a un cliente

  @Column()
  monto: number;

  @Column()
  estado: string;  // Solicitado → En Estudio → Aprobado / Rechazado → Desembolsado → Pagado

  @OneToMany(() => Pago, pago => pago.solicitud)
  pagos: Pago[];  // Relación con Pago: un préstamo puede tener muchos pagos
}
