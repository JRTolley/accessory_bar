import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { AccessorySet } from "./AccessorySet";
import { Merchant } from "./Merchant";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  pid!: string;

  @ManyToMany(() => AccessorySet, (set) => set.accessories, {
    onDelete: "CASCADE",
  })
  @JoinTable()
  sets?: AccessorySet[];

  @Column()
  price!: string;

  @Column()
  img!: string;

  @Column()
  title!: string;

  @Column()
  handle!: string;

  @Column()
  merchantId: string;

  @ManyToOne("Merchant", "products")
  merchant!: Merchant;
}
