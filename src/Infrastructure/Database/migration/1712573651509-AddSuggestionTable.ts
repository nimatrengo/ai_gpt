import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSuggestionTable1712573651509 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "suggestion" (
                "id" SERIAL NOT NULL,
                "ticket_id" integer NOT NULL,
                "user_id" integer NOT NULL,
                "message" text NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT "PK_suggestion_id" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "suggestion"
        `);
  }
}
