import { Column, Entity, Index, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Order } from "./order.entity";

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

  @Column({default: null})
  public isAdmin!: number;

  @OneToMany(type => Order, (order) => order.userId)
  public orders!: Order[];


}
