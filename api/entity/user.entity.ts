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
<<<<<<< HEAD

  @Column({default : null})
=======
  @Column({default: null})
>>>>>>> b3f4f5e931252cc90e03749fa4d7cd45919787e4
  public profileUrl!: string;

  @Column()
  @Index({ unique: true })
  public emailAddress!: string;

  @OneToMany(type => Order, (order) => order.userId)
  public orders!: Order[];
}
