import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Brands {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  @Index({ unique: true })
  public name!: string;
  
}