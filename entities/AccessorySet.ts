import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Merchant } from "./Merchant";

@Entity()
export class AccessorySet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  baseProduct!: string;

  @Column()
  merchantId!: number;

  @ManyToOne(() => Merchant, (merchant) => merchant.accessorySets, {
    cascade: true,
  })
  merchant!: Merchant;
}
