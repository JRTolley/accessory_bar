import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Merchant } from "./Merchant";
import { Product } from "./Product";
import { StoreEvent } from "./StoreEvent";

@Entity()
export class AccessorySet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne("Product", { nullable: false, eager: true, onDelete: "CASCADE" })
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

  @OneToMany(() => StoreEvent, (event) => event.set)
  storeEvents?: StoreEvent[];

  @Column({ default: 0 })
  impressions!: number;

  async incrementImpressions() {
    this.impressions++;
    await this.save();
  }
}
