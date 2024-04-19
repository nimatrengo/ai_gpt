import { User } from '@/Domain/Authentication/Domain/Entity/User';
import { BotMessage } from '@/Domain/Bot/Domain/Entity/BotMessage';

export class CreateBotMessageCommand {
  message: string;
  isReply: boolean;
  user: User;
  parentMessageId: BotMessage | null;
  room_id: number;

  constructor({
    message,
    isReply,
    user,
    parentMessageId,
    room_id,
  }: {
    message: string;
    isReply: boolean;
    user: User;
    parentMessageId: BotMessage | null;
    room_id: number;
  }) {
    this.message = message;
    this.isReply = isReply;
    this.user = user;
    this.parentMessageId = parentMessageId;
    this.room_id = room_id;
  }
}
