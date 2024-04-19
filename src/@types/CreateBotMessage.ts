import { User } from '@/Domain/Authentication/Domain/Entity/User';
import { BotMessage } from '@/Domain/Bot/Domain/Entity/BotMessage';

export type CreateBotPayload = {
  message: string;
  isReply: boolean;
  userId: User;
  parentMessageId: BotMessage | null;
  roomId: number;
};
