import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTokenTable1710628252299 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "token"
            ALTER COLUMN "token" TYPE VARCHAR(512);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "token"
            ALTER COLUMN "token" TYPE VARCHAR(100);
        `);
  }
}
