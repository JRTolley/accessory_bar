import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { AccessorySet } from "./AccessorySet";
import { Merchant } from "./Merchant";
import { Product } from "./Product";

@Entity()
export class StoreEvent extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  type!: "Clickthrough";

  @ManyToOne(() => Product, (product) => product.storeEvents, {
    onDelete: "CASCADE",
    eager: true,
  })
  product!: Product;

  @ManyToOne(() => AccessorySet, (set) => set.storeEvents, {
    onDelete: "CASCADE",
    eager: true,
  })
  set!: AccessorySet;

  @ManyToOne(() => Merchant, (merchant) => merchant.storeEvents, {
    onDelete: "CASCADE",
    eager: true,
  })
  merchant!: Merchant;
}
