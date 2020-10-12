import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Accessory } from "./Accessory";
import { Merchant } from "./Merchant";

@Entity()
export class AccessorySet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ unique: true })
  baseProduct!: string;

  @Column()
  merchantId!: number;

  @ManyToOne("Merchant", "accessorySets", {
    cascade: true,
  })
  merchant!: Merchant;

  @OneToMany("Accessory", "set", {
    eager: true,
    cascade: true,
    onDelete: "CASCADE",
  })
  accessories?: Accessory[];
}
