import { User } from '@/Domain/Authentication/Domain/Entity/User';
import { BotMessage } from '../Entity/BotMessage';
import { CreateBotPayload } from '@/@types/CreateBotMessage';
import { ChatRoom } from '@/Domain/ChatRoom/Domain/Entity/ChatRoom';

type CreateBotMessagePayload = Omit<CreateBotPayload, 'userId' | 'roomId'> & {
  user: User;
  roomId: ChatRoom;
};

export interface IBotMessageRepository {
  createMessage(data: CreateBotMessagePayload): Promise<BotMessage>;
  findById(id: number): Promise<BotMessage[] | null>;
  findByUser(user: User): Promise<BotMessage[] | null>;
  findReplyMessages(botMessage: BotMessage): Promise<BotMessage[] | null>;
}
