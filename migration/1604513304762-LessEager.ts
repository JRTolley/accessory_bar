import {MigrationInterface, QueryRunner} from "typeorm";

export class LessEager1604513304762 implements MigrationInterface {
    name = 'LessEager1604513304762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_62fcc319202f6ec1f6819e1d5f5"`);
        await queryRunner.query(`ALTER TABLE "accessory_set" DROP CONSTRAINT "FK_b4080f3676bfa5aaa549f63689a"`);
        await queryRunner.query(`ALTER TABLE "store_event" ADD "merchantId" integer`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "merchantId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "accessory_set" ALTER COLUMN "merchantId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "store_event" ADD CONSTRAINT "FK_13d14121c013c117a81173740f9" FOREIGN KEY ("merchantId") REFERENCES "merchant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_62fcc319202f6ec1f6819e1d5f5" FOREIGN KEY ("merchantId") REFERENCES "merchant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accessory_set" ADD CONSTRAINT "FK_b4080f3676bfa5aaa549f63689a" FOREIGN KEY ("merchantId") REFERENCES "merchant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accessory_set" DROP CONSTRAINT "FK_b4080f3676bfa5aaa549f63689a"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_62fcc319202f6ec1f6819e1d5f5"`);
        await queryRunner.query(`ALTER TABLE "store_event" DROP CONSTRAINT "FK_13d14121c013c117a81173740f9"`);
        await queryRunner.query(`ALTER TABLE "accessory_set" ALTER COLUMN "merchantId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "merchantId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "store_event" DROP COLUMN "merchantId"`);
        await queryRunner.query(`ALTER TABLE "accessory_set" ADD CONSTRAINT "FK_b4080f3676bfa5aaa549f63689a" FOREIGN KEY ("merchantId") REFERENCES "merchant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_62fcc319202f6ec1f6819e1d5f5" FOREIGN KEY ("merchantId") REFERENCES "merchant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
