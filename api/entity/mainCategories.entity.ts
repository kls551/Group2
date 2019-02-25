import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, JoinTable, OneToMany } from "typeorm";
import { SubCategory } from "../entity";

@Entity()
export class MainCategory {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @OneToMany(type => SubCategory, subCategory => subCategory.mainCategory)
  public subCategories!: SubCategory[];
  
//   @ManyToOne((type) => SubCategory, subcategory => subcategory.name)
//   public subCategory!: SubCategory;
}