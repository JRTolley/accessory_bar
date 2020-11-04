import {MigrationInterface, QueryRunner} from "typeorm";

export class MakeNotNull1604519412312 implements MigrationInterface {
    name = 'MakeNotNull1604519412312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "merchant" ALTER COLUMN "accessToken" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "merchant" ALTER COLUMN "planType" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "merchant" ALTER COLUMN "planType" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "merchant" ALTER COLUMN "accessToken" DROP NOT NULL`);
    }

}
