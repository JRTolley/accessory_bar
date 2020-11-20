import {MigrationInterface, QueryRunner} from "typeorm";

export class SetThemeEditorDefaultFalse1605884522442 implements MigrationInterface {
    name = 'SetThemeEditorDefaultFalse1605884522442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "merchant" ALTER COLUMN "showOnThemeEditor" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "merchant" ALTER COLUMN "showOnThemeEditor" SET DEFAULT true`);
    }

}
