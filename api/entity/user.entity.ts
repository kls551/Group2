import { Column, Entity, Index, PrimaryGeneratedColumn, OneToMany, OneToOne , JoinColumn} from "typeorm";
import { Order, ShopItem, Cart } from "./";

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

  @OneToMany(type => ShopItem, (shopitem) => shopitem.id)
  public cartList!: ShopItem[];

  @OneToOne((type) => Cart, cart => cart.user)
  public cart!: Cart;
}
