import { Column, Entity, Index, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ShopItem } from "./shopitem.entity";

@Entity()
export class Brands {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  @Index({ unique: true })
  public name!: string;

  @OneToMany((type) => ShopItem, item => item.id) 
  public shopitem!: ShopItem;
  
}