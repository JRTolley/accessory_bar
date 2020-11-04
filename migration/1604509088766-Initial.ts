import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1604509088766 implements MigrationInterface {
    name = 'Initial1604509088766'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "merchant" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "shopName" character varying NOT NULL, "accessToken" character varying, "enabled" boolean NOT NULL DEFAULT true, "planType" character varying DEFAULT 'Free', CONSTRAINT "UQ_250268147a64e82449f6870c64f" UNIQUE ("shopName"), CONSTRAINT "PK_9a3850e0537d869734fc9bff5d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "store_event" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "productId" integer, "setId" integer, CONSTRAINT "PK_670eac35e425d9b704b96dd5063" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "pid" character varying NOT NULL, "price" character varying NOT NULL, "img" character varying NOT NULL, "title" character varying NOT NULL, "handle" character varying NOT NULL, "merchantId" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "accessory_set" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "merchantId" integer NOT NULL, "impressions" integer NOT NULL DEFAULT 0, "baseProductId" integer NOT NULL, CONSTRAINT "REL_9d94402f3618ec2aefc64e78a8" UNIQUE ("baseProductId"), CONSTRAINT "PK_0280393b0d2bd9a771f81d1f910" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_sets_accessory_set" ("productId" integer NOT NULL, "accessorySetId" integer NOT NULL, CONSTRAINT "PK_bdecd6449b4a842c73bbd843d69" PRIMARY KEY ("productId", "accessorySetId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6196665b2c9e962dbe59f6a177" ON "product_sets_accessory_set" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_dc0e0523928a117c3d2ad3a1c8" ON "product_sets_accessory_set" ("accessorySetId") `);
        await queryRunner.query(`ALTER TABLE "store_event" ADD CONSTRAINT "FK_73452341d8bb69e89ebbe0fbb03" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "store_event" ADD CONSTRAINT "FK_fd1a2448cf9c78464af5fc72b0a" FOREIGN KEY ("setId") REFERENCES "accessory_set"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_62fcc319202f6ec1f6819e1d5f5" FOREIGN KEY ("merchantId") REFERENCES "merchant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accessory_set" ADD CONSTRAINT "FK_9d94402f3618ec2aefc64e78a83" FOREIGN KEY ("baseProductId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accessory_set" ADD CONSTRAINT "FK_b4080f3676bfa5aaa549f63689a" FOREIGN KEY ("merchantId") REFERENCES "merchant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_sets_accessory_set" ADD CONSTRAINT "FK_6196665b2c9e962dbe59f6a177d" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_sets_accessory_set" ADD CONSTRAINT "FK_dc0e0523928a117c3d2ad3a1c8e" FOREIGN KEY ("accessorySetId") REFERENCES "accessory_set"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_sets_accessory_set" DROP CONSTRAINT "FK_dc0e0523928a117c3d2ad3a1c8e"`);
        await queryRunner.query(`ALTER TABLE "product_sets_accessory_set" DROP CONSTRAINT "FK_6196665b2c9e962dbe59f6a177d"`);
        await queryRunner.query(`ALTER TABLE "accessory_set" DROP CONSTRAINT "FK_b4080f3676bfa5aaa549f63689a"`);
        await queryRunner.query(`ALTER TABLE "accessory_set" DROP CONSTRAINT "FK_9d94402f3618ec2aefc64e78a83"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_62fcc319202f6ec1f6819e1d5f5"`);
        await queryRunner.query(`ALTER TABLE "store_event" DROP CONSTRAINT "FK_fd1a2448cf9c78464af5fc72b0a"`);
        await queryRunner.query(`ALTER TABLE "store_event" DROP CONSTRAINT "FK_73452341d8bb69e89ebbe0fbb03"`);
        await queryRunner.query(`DROP INDEX "IDX_dc0e0523928a117c3d2ad3a1c8"`);
        await queryRunner.query(`DROP INDEX "IDX_6196665b2c9e962dbe59f6a177"`);
        await queryRunner.query(`DROP TABLE "product_sets_accessory_set"`);
        await queryRunner.query(`DROP TABLE "accessory_set"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "store_event"`);
        await queryRunner.query(`DROP TABLE "merchant"`);
    }

}
