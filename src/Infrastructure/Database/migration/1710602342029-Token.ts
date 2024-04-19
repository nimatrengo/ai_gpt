import { MigrationInterface, QueryRunner } from 'typeorm';

export class Token1710602342029 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "token" (
                "id" SERIAL NOT NULL,
                "token" varchar(512) NOT NULL,
                "userId" integer NOT NULL,
                "expiresAt" TIMESTAMP,
                CONSTRAINT "PK_token_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_user" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "token"
        `);
  }
}
