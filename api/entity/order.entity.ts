
import { Column, Entity, JoinColumn, ManyToOne, ManyToMany, JoinTable, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../entity";
import { ShopItem } from "./shopitem.entity";
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({default:null})
  public userId!: number;

  @Column({default:null})
  public status!: number;

  @Column({default:null})
  public pickup!: boolean;

  @Column({default: null})
  public address!: string;

  @Column({default: null})
  public city!: string;

  @Column({default:null})
  public shipped!: Date;

  @Column({default:null})
  public orderedDate!: Date;

  @ManyToOne((type) => User, user => user.orders, { cascade: true })
  @JoinColumn()
  public user!: User;

  @ManyToMany(type => ShopItem, item => item.id)
  @JoinTable()
  public items!: ShopItem[];
}