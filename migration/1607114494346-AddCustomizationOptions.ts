import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCustomizationOptions1607114494346 implements MigrationInterface {
    name = 'AddCustomizationOptions1607114494346'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customization_options" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying DEFAULT null, "titleFont" character varying DEFAULT null, "titleFontSize" integer DEFAULT null, "itemMaxXSize" integer DEFAULT null, "itemFont" character varying DEFAULT null, "itemFontSize" integer DEFAULT null, "itemPaddingX" integer DEFAULT null, "barPaddingX" integer DEFAULT null, "barPaddingY" integer DEFAULT null, "merchantId" integer, CONSTRAINT "REL_eb67960fd63ba173b70e52f76e" UNIQUE ("merchantId"), CONSTRAINT "PK_0c0169adb5af8ecb7cb1469b4eb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "customization_options" ADD CONSTRAINT "FK_eb67960fd63ba173b70e52f76e5" FOREIGN KEY ("merchantId") REFERENCES "merchant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customization_options" DROP CONSTRAINT "FK_eb67960fd63ba173b70e52f76e5"`);
        await queryRunner.query(`DROP TABLE "customization_options"`);
    }

}
