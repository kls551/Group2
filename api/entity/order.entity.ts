
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../entity";
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({default:null})
  public userId!: number;

  @Column({default:null})
  public complete!: boolean;

  @Column({default:null})
  public status!: number;

  @Column({default:null})
  public pickup!: boolean;

  @Column({default:null})
  public processing!: boolean;

  @Column({default:null})
  public shipped!: Date;

  @Column({default:null})
  public trackingNum!: string;

  @Column({default: null})
  public address!: string;

  @Column({default: null})
  public city!: string;

  @Column({default:null})
  public orderedDate!: Date;

  @ManyToOne((type) => User, user => user.orders, { cascade: true })
  @JoinColumn()
  public user!: User;
}