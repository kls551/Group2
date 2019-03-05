import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Brands {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;
  
}