import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

  @Column()
  public category!: string;

  @Column()
  public inStorePickup!: boolean;

  @Column()
  public postedDate!: Date;

  @Column({default: null})
  public imageUrl!: string;

}