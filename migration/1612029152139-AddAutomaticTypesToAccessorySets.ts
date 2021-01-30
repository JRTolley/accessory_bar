import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAutomaticTypesToAccessorySets1612029152139 implements MigrationInterface {
    name = 'AddAutomaticTypesToAccessorySets1612029152139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accessory_set" ADD "type" character varying NOT NULL DEFAULT 'custom'`);
        await queryRunner.query(`COMMENT ON COLUMN "customization_options"."title" IS NULL`);
        await queryRunner.query(`ALTER TABLE "customization_options" ALTER COLUMN "title" SET DEFAULT null`);
        await queryRunner.query(`COMMENT ON COLUMN "customization_options"."titleFont" IS NULL`);
        await queryRunner.query(`ALTER TABLE "customization_options" ALTER COLUMN "titleFont" SET DEFAULT null`);
        await queryRunner.query(`COMMENT ON COLUMN "customization_options"."titleFontSize" IS NULL`);
        await queryRunner.query(`ALTER TABLE "customization_options" ALTER COLUMN "titleFontSize" SET DEFAULT null`);
        await queryRunner.query(`COMMENT ON COLUMN "customization_options"."itemMaxXSize" IS NULL`);
        await queryRunner.query(`ALTER TABLE "customization_options" ALTER COLUMN "itemMaxXSize" SET DEFAULT null`);
        await queryRunner.query(`COMMENT ON COLUMN "customization_options"."itemFont" IS NULL`);
        await queryRunner.query(`ALTER TABLE "customization_options" ALTER COLUMN "itemFont" SET DEFAULT null`);
        await queryRunner.query(`COMMENT ON COLUMN "customization_options"."itemFontSize" IS NULL`);
        await queryRunner.query(`ALTER TABLE "customization_options" ALTER COLUMN "itemFontSize" SET DEFAULT null`);
        await queryRunner.query(`COMMENT ON COLUMN "customization_options"."itemPaddingX" IS NULL`);
        await queryRunner.query(`ALTER TABLE "customization_options" ALTER COLUMN "itemPaddingX" SET DEFAULT null`);
        await queryRunner.query(`COMMENT ON COLUMN "customization_options"."barPaddingX" IS NULL`);
        await queryRunner.query(`ALTER TABLE "customization_options" ALTER COLUMN "barPaddingX" SET DEFAULT null`);
        await queryRunner.query(`COMMENT ON COLUMN "customization_options"."barPaddingY" IS NULL`);
        await queryRunner.query(`ALTER TABLE "customization_options" ALTER COLUMN "barPaddingY" SET DEFAULT null`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customization_options" ALTER COLUMN "barPaddingY" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "customization_options"."barPaddingY" IS NULL`);
        await queryRunner.query(`ALTER TABLE "customization_options" ALTER COLUMN "barPaddingX" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "customization_options"."barPaddingX" IS NULL`);
        await queryRunner.query(`ALTER TABLE "customization_options" ALTER COLUMN "itemPaddingX" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "customization_options"."itemPaddingX" IS NULL`);
        await queryRunner.query(`ALTER TABLE "customization_options" ALTER COLUMN "itemFontSize" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "customization_options"."itemFontSize" IS NULL`);
        await queryRunner.query(`ALTER TABLE "customization_options" ALTER COLUMN "itemFont" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "customization_options"."itemFont" IS NULL`);
        await queryRunner.query(`ALTER TABLE "customization_options" ALTER COLUMN "itemMaxXSize" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "customization_options"."itemMaxXSize" IS NULL`);
        await queryRunner.query(`ALTER TABLE "customization_options" ALTER COLUMN "titleFontSize" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "customization_options"."titleFontSize" IS NULL`);
        await queryRunner.query(`ALTER TABLE "customization_options" ALTER COLUMN "titleFont" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "customization_options"."titleFont" IS NULL`);
        await queryRunner.query(`ALTER TABLE "customization_options" ALTER COLUMN "title" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "customization_options"."title" IS NULL`);
        await queryRunner.query(`ALTER TABLE "accessory_set" DROP COLUMN "type"`);
    }

}
