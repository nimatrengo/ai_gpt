import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1710602321064 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "email" varchar(100) NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "deleted_at" TIMESTAMP,
                CONSTRAINT "PK_user_id" PRIMARY KEY ("id"),
                CONSTRAINT "UQ_email" UNIQUE ("email")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "user"
        `);
  }
}
