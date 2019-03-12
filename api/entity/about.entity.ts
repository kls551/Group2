import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class About {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public address!: string;

  @Column()
  public email!: string;

  @Column()
  public phone!: string;

  @Column()
  public profileUrl!: string;

  @Column()
  public monday!: string;

  @Column()
  public tuesday!: string;

  @Column()
  public wednesday!: string;

  @Column()
  public thursday!: string;

  @Column()
  public friday!: string;

  @Column()
  public saturday!: string;
  
  @Column()
  public sunday!: string;
}