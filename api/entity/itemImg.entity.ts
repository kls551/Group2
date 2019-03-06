import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToOne, ManyToMany } from "typeorm";
import { ShopItem } from "./";

@Entity()
export class Imgs {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({default: null})
  public img!: string;

  @ManyToOne(type => ShopItem, ShopItem => ShopItem.images, {
    onDelete: 'CASCADE'
  })
  public ShopItem!: ShopItem;
}