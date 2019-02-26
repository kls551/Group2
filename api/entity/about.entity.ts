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

  @Column({default:null})
  public monday!: string;
  @Column({default:null})
  public tuesday!: string;
  @Column({default:null})
  public wednesday!: string;
  @Column({default:null})
  public thursday!: string;
  @Column({default:null})
  public friday!: string;
  @Column({default:null})
  public saturday!: string;
  @Column({default:null})
  public sunday!: string;
}