import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { AccessorySet } from "./AccessorySet";

@Entity()
export class Merchant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  shopName: string;

  @OneToMany(() => AccessorySet, (accessorySet) => accessorySet.merchant)
  accessorySets?: AccessorySet[];
}
