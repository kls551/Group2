import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, JoinTable, JoinColumn, OneToOne, ManyToMany} from "typeorm";
import { User, MainCategory, SubCategory, Imgs, Brands  } from "./";

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

  @ManyToOne((type) => Brands, brand => brand.id)
  public brand!: Brands;

  @Column()
  public inStorePickup!: boolean;

  @Column()
  public postedDate!: Date;

  @OneToMany(type => Imgs, Imgs => Imgs.ShopItem)
  public images!: Imgs[];

  @ManyToOne(type => User, user => user.cart, {
    onDelete: 'CASCADE'
  })
  public user!: User;

}