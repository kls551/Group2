import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../entity";
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({default:null})
  public userId!: number;

  @Column({default:null})
  public fn!: string;

  @Column({default:null})
  public ln!: string;

  @Column({default:null})
  public Address!: string;

  @Column({default:null})
  public City!: string;

  @Column({default:null})
  public cnum!: string;

  @Column({default:null})
  public complete!: boolean;

  @Column({default:null})
  public pickup!: boolean;

  @Column({default:null})
  public processing!: boolean;

  @Column({default:null})
  public shipped!: boolean;

  @Column({default:null})
  public orderedDate!: Date;

  @ManyToOne((type) => User, user => user.orders, { cascade: true })
  @JoinColumn()
  public user!: User;
}