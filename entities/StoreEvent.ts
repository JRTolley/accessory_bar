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
import { Product } from "./Product";

@Entity()
export class StoreEvent extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: "Clickthrough";

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Product, (product) => product.storeEvents, {
    cascade: true,
    eager: true,
  })
  product!: Product;

  @ManyToOne(() => AccessorySet, (set) => set.storeEvents, {
    cascade: true,
    eager: true,
  })
  set!: AccessorySet;
}
