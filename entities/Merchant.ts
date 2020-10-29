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

@Entity()
export class Merchant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ unique: true })
  shopName: string;

  @Column({ nullable: true })
  accessToken: string;

  @Column({ nullable: true, default: "Free" })
  planType?: "None" | "Free" | "Beta" | "Full" | "Pro";

  @OneToMany("AccessorySet", "merchant", { eager: true })
  accessorySets?: AccessorySet[];

  @OneToMany("Product", "merchant", {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    eager: true,
  })
  products?: Product[];
}
