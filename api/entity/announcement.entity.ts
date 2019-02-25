import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Announcement {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({default:null})
  public title!: string;

  @Column({default:null})
  public body!: string;
}