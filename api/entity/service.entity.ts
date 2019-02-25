import { Column, Entity, Index, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public serviceName!: string;

  @Column()
  public description!: string;

  @Column()
  public price!: number;
}
