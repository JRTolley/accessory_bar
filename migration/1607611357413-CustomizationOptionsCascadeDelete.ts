import {MigrationInterface, QueryRunner} from "typeorm";

export class CustomizationOptionsCascadeDelete1607611357413 implements MigrationInterface {
    name = 'CustomizationOptionsCascadeDelete1607611357413'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customization_options" DROP CONSTRAINT "FK_eb67960fd63ba173b70e52f76e5"`);
        await queryRunner.query(`ALTER TABLE "customization_options" ALTER COLUMN "title" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "customization_options" ALTER COLUMN "titleFont" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "customization_options" ALTER COLUMN "titleFontSize" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "customization_options" ALTER COLUMN "itemMaxXSize" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "customization_options" ALTER COLUMN "itemFont" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "customization_options" ALTER COLUMN "itemFontSize" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "customization_options" ALTER COLUMN "itemPaddingX" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "customization_options" ALTER COLUMN "barPaddingX" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "customization_options" ALTER COLUMN "barPaddingY" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "customization_options" ADD CONSTRAINT "FK_eb67960fd63ba173b70e52f76e5" FOREIGN KEY ("merchantId") REFERENCES "merchant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customization_options" DROP CONSTRAINT "FK_eb67960fd63ba173b70e52f76e5"`);
        await queryRunner.query(`ALTER TABLE "customization_options" ALTER COLUMN "barPaddingY" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "customization_options" ALTER COLUMN "barPaddingX" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "customization_options" ALTER COLUMN "itemPaddingX" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "customization_options" ALTER COLUMN "itemFontSize" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "customization_options" ALTER COLUMN "itemFont" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "customization_options" ALTER COLUMN "itemMaxXSize" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "customization_options" ALTER COLUMN "titleFontSize" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "customization_options" ALTER COLUMN "titleFont" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "customization_options" ALTER COLUMN "title" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "customization_options" ADD CONSTRAINT "FK_eb67960fd63ba173b70e52f76e5" FOREIGN KEY ("merchantId") REFERENCES "merchant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
