import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MainCategory } from "../entity";

@Entity()
export class SubCategory {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;
  
  // @OneToMany((type) => MainCategory, maincategory => maincategory.name, { cascade: true })
  // public mainCategories!: MainCategory[];
}