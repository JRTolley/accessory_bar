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
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => Merchant, (merchant) => merchant.accessorySets, {
    onDelete: "CASCADE",
  })
  merchant!: Merchant;

  @OneToOne(() => Product, {
    nullable: false,
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  baseProduct!: Product;

  @ManyToMany(() => Product, (product) => product.sets, {
    cascade: true,
  })
  accessories?: Product[];

  @OneToMany(() => StoreEvent, (event) => event.set)
  storeEvents?: StoreEvent[];

  @Column({ default: 0 })
  impressions!: number;

  @Column({ default: "custom", nullable: false })
  type: "custom" | "automatic";

  async incrementImpressions() {
    this.impressions++;
    await this.save();
  }
}
