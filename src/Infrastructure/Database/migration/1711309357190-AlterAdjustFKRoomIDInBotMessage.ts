import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterAdjustFKRoomIDInBotMessage1711309357190
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "bot_message"
            ADD CONSTRAINT "FK_bot_message_room"
            FOREIGN KEY ("roomId") REFERENCES "chat_room"("id") ON DELETE CASCADE;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "bot_message"
            DROP CONSTRAINT "FK_bot_message_room";
        `);
  }
}
