import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Merchant } from "./Merchant";

@Entity()
export class CustomizationOptions extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToOne(() => Merchant, { onDelete: "CASCADE" })
  @JoinColumn()
  merchant!: Merchant;

  @Column({ default: null, nullable: true })
  title?: String;

  @Column({ default: null, nullable: true })
  titleFont?: String;

  @Column({ default: null, nullable: true })
  titleFontSize?: number;

  @Column({ default: null, nullable: true })
  itemMaxXSize?: number;

  @Column({ default: null, nullable: true })
  itemFont?: String;

  @Column({ default: null, nullable: true })
  itemFontSize?: Number;

  @Column({ default: null, nullable: true })
  itemPaddingX?: number;

  @Column({ default: null, nullable: true })
  barPaddingX?: number;

  @Column({ default: null, nullable: true })
  barPaddingY?: number;
}
