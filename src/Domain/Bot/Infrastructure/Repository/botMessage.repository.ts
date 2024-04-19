import { User } from '@/Domain/Authentication/Domain/Entity/User';
import { DataSource } from 'typeorm';
import { BotMessage } from '@/Domain/Bot/Domain/Entity/BotMessage';
import { IBotMessageRepository } from '@/Domain/Bot/Domain/RepositoryInterface/botMessageRepositoryInterface';
import { ChatRoom } from '@/Domain/ChatRoom/Domain/Entity/ChatRoom';

export class BotMessageRepository implements IBotMessageRepository {
  constructor(private dataSource: DataSource) {}

  async createMessage({
    message,
    user,
    roomId,
  }: {
    message: string;
    user: User;
    roomId: ChatRoom;
  }): Promise<BotMessage> {
    const botMessageRepository = this.dataSource.getRepository(BotMessage);
    const botMessageModel = new BotMessage();
    botMessageModel.message = message;
    botMessageModel.user = user;
    botMessageModel.isReply = false;
    botMessageModel.roomId = roomId;
    return botMessageRepository.save(botMessageModel);
  }

  async findById(id: number): Promise<BotMessage[] | null> {
    return this.dataSource.getRepository(BotMessage).find({
      where: { id },
    });
  }

  async findByUser(user: User): Promise<BotMessage[] | null> {
    return this.dataSource.getRepository(BotMessage).find({
      where: { user },
    });
  }

  async findReplyMessages(
    botMessage: BotMessage
  ): Promise<BotMessage[] | null> {
    return this.dataSource.getRepository(BotMessage).find({
      where: { parentMessageId: botMessage },
    });
  }
}
