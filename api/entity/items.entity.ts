import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Items {

   @PrimaryGeneratedColumn()
   id!: number;

   @Column()
   name!: string;

   @Column()
   ship!: boolean;

   @Column({ type: "integer" })
   count!: number;

   @Column({ type: "text" })
   description!: string;

   @Column({ type: "decimal" })
   price!: number;
}
