import { DataSource } from 'typeorm';
import 'dotenv/config';
import { User } from '@/Domain/Authentication/Domain/Entity/User';
import { Token } from '@/Domain/Authentication/Domain/Entity/Token';
import { BotMessage } from '@/Domain/Bot/Domain/Entity/BotMessage';
import { ChatRoom } from '@/Domain/ChatRoom/Domain/Entity/ChatRoom';
import { Suggestion } from '@/Domain/Suggestion/Domain/Entity/Suggestion';

const port = (process.env.DB_PORT as unknown as number) || 5432;

export const DatabaseConfig = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: port,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Token, BotMessage, ChatRoom, Suggestion],
  migrations: ['src/Infrastructure/Database/migration/**/*.ts'],
  ssl:
    process.env.DB_SSL_MODE === 'true'
      ? {
          rejectUnauthorized: false,
        }
      : false,
});
