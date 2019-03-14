import { Column, Entity, JoinColumn, Index, ManyToOne, PrimaryGeneratedColumn, JoinTable, OneToMany, OneToOne, ManyToMany  } from "typeorm";
import { SubCategory } from "../entity";
import { ShopItem } from "./shopitem.entity";

@Entity()
export class MainCategory {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  @Index({ unique: true })
  public name!: string;

  @Column({default : false})
  public show!: boolean;

  @OneToMany(type => SubCategory, subCategory => subCategory.mainCategory)
  public subCategories!: SubCategory[];

  @OneToMany(type => ShopItem, item => item.id)
  public shop_item!: ShopItem;

}
