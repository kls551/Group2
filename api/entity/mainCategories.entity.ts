import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, JoinTable } from "typeorm";
import { SubCategory } from "../entity";

@Entity()
export class MainCategory {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;
  
//   @ManyToOne((type) => SubCategory, subcategory => subcategory.name)
//   public subCategory!: SubCategory;
}