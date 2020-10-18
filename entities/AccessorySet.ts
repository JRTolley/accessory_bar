import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Merchant } from "./Merchant";
import { Product } from "./Product";

@Entity()
export class AccessorySet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne("Product", { nullable: false, eager: true })
  @JoinColumn()
  baseProduct!: Product;

  @Column()
  merchantId!: number;

  @ManyToOne("Merchant", "accessorySets", {
    cascade: true,
  })
  merchant!: Merchant;

  @ManyToMany("Product", "sets", {
    eager: true,
    cascade: true,
    onDelete: "CASCADE",
  })
  accessories?: Product[];
}
