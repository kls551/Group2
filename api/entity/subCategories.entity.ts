import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { MainCategory, ShopItem } from "./";

@Entity()
export class SubCategory {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @ManyToOne((type) => ShopItem, shopitem => shopitem.id)
  public shopitem!: ShopItem;
  
  @ManyToOne(type => MainCategory, mainCategory => mainCategory.subCategories, {
    onDelete: 'CASCADE'
  })
  public mainCategory!: MainCategory;
  
}