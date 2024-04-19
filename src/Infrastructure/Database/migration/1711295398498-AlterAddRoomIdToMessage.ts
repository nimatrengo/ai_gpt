import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterAddRoomIdToMessage1711295398498
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "bot_message"
            ADD COLUMN "roomId" integer;
        `);
    await queryRunner.query(`
            ALTER TABLE "bot_message"
            ADD CONSTRAINT "FK_bot_message_roomId"
            FOREIGN KEY ("roomId") REFERENCES "chat_room"("id") ON DELETE CASCADE;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "bot_message"
            DROP CONSTRAINT "FK_bot_message_roomId";
        `);
    await queryRunner.query(`
            ALTER TABLE "bot_message"
            DROP COLUMN "roomId";
        `);
  }
}
