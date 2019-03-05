import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToOne, ManyToMany } from "typeorm";
import { User, MainCategory } from "./";

@Entity()
export class ShopItem {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @Column()
  public details!: string;

  @Column()
  public price!: number;

  @Column()
  public quantity!: number;

  @ManyToOne(type => MainCategory, cat => cat.id)
  public category!: MainCategory;

  @Column({default: null})
  public brand!: string;

  @Column()
  public inStorePickup!: boolean;

  @Column()
  public postedDate!: Date;

  @Column({default: null})
  public imageUrl!: string;

  @ManyToOne(type => User, user => user.cart, {
    onDelete: 'CASCADE'
  })
  public user!: User;

}