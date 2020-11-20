import {MigrationInterface, QueryRunner} from "typeorm";

export class AddShowOnThemeEditor1605803954605 implements MigrationInterface {
    name = 'AddShowOnThemeEditor1605803954605'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "merchant" ADD "showOnThemeEditor" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "merchant" ALTER COLUMN "enabled" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "merchant" ALTER COLUMN "enabled" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "merchant" DROP COLUMN "showOnThemeEditor"`);
    }

}
