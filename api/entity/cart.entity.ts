import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, JoinTable, JoinColumn, OneToOne, ManyToMany} from "typeorm";
import { User, MainCategory, SubCategory, Imgs  } from "./";
import { ShopItem } from "./shopitem.entity";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  public id!: number;

//   @Column()
//   public quantities!: number[];

  @ManyToMany(type => ShopItem, item => item.id)
  @JoinTable()
  public items!: ShopItem[] | undefined; 

  @OneToOne(type => User)
  @JoinColumn()
  public user!: User;
}