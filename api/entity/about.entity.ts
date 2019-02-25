import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class About {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({default:null})
  public address!: string;

  @Column({default:null})
  public email!: string;

  @Column({default:null})
  public phone!: string;

  @Column({default: null})
  public profileUrl!: string;
}