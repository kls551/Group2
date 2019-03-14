import { Column, Entity, Index, JoinColumn, OneToMany, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { MainCategory, ShopItem } from "./";

@Entity()
export class SubCategory {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;
  
  @ManyToOne(type => MainCategory, mainCategory => mainCategory.subCategories, {
    onDelete: 'CASCADE'
  })
  public mainCategory!: MainCategory;
  
}