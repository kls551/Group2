import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, JoinTable, ManyToMany} from "typeorm";
import { User, MainCategory, SubCategory } from "./";

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

  @ManyToMany((type) => SubCategory, subcat => subcat.id)
  @JoinTable()
  public subcategories!: SubCategory[];

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