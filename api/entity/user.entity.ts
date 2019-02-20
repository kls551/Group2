import { Column, Entity, Index, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Order } from "./order.entity";
import { ToDo } from "./todo.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public firstName!: string;

  @Column()
  public lastName!: string;

  @Column()
  public password!: string;
  @Column({default: null})
  public profileUrl!: string;

  @Column()
  @Index({ unique: true })
  public emailAddress!: string;

  @OneToMany(type => Order, (order) => order.userId)
  public orders!: Order[];

  @OneToMany(type => ToDo, (todo) => todo.user)
  public todos!: ToDo[];
}
