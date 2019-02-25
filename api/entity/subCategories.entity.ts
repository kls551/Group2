import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { MainCategory } from "../entity";

@Entity()
export class SubCategory {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;
  
  @ManyToOne(type => MainCategory, mainCategory => mainCategory.subCategories)
  public mainCategory!: MainCategory;
  
}