import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { AccessorySet } from "./AccessorySet";
import { Product } from "./Product";
import { StoreEvent } from "./StoreEvent";

@Entity()
export class Merchant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ unique: true })
  shopName!: string;

  @Column({ nullable: true })
  accessToken?: string;

  @Column({ default: true })
  enabled!: boolean;

  @Column({ nullable: true, default: "Free" })
  planType?: "None" | "Free" | "Beta" | "Full" | "Pro";

  @OneToMany(() => AccessorySet, (set) => set.merchant)
  accessorySets?: AccessorySet[];

  @OneToMany(() => Product, (product) => product.merchant)
  products?: Product[];

  @OneToMany(() => StoreEvent, (event) => event.merchant)
  storeEvents?: StoreEvent[];
}
