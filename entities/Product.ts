import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { AccessorySet } from "./AccessorySet";
import { Merchant } from "./Merchant";
import { StoreEvent } from "./StoreEvent";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column()
  pid!: string;

  @ManyToMany(() => AccessorySet, (set) => set.accessories)
  @JoinTable()
  sets?: AccessorySet[];

  @Column()
  price!: string;

  @Column()
  img!: string;

  @Column()
  title!: string;

  @Column()
  handle!: string;

  @ManyToOne(() => Merchant, (merchant) => merchant.products, {
    nullable: false,
    onDelete: "CASCADE",
  })
  merchant!: Merchant;

  @OneToMany(() => StoreEvent, (event) => event.product)
  storeEvents?: Promise<StoreEvent[]>;
}
