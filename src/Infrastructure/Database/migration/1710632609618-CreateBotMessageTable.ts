import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBotMessageTable1710632609618 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "bot_message" (
                "id" SERIAL NOT NULL,
                "userId" integer NOT NULL,
                "message" text NOT NULL,
                "is_reply" boolean NOT NULL DEFAULT false,
                "parent_message_id" integer,
                "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT "PK_token_bot_message_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_bot_message_user" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "bot_message"
        `);
  }
}
