import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateChatRoomTable1710676428064 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "chat_room" (
                "id" SERIAL NOT NULL,
                "userId" integer NOT NULL,
                "title" text NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT "PK_chat_room_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_chat_room_user_id" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "chat_room"
        `);
  }
}
