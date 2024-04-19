import { User } from '@/Domain/Authentication/Domain/Entity/User';
import { DataSource } from 'typeorm';
import { IChatRoomRepository } from '@/Domain/ChatRoom/Domain/RepositoryInterface/chatRoomRepositoryInterface';
import { ChatRoom } from '@/Domain/ChatRoom/Domain/Entity/ChatRoom';

export class ChatRoomRepository implements IChatRoomRepository {
  constructor(private dataSource: DataSource) {}

  async createRoom({
    title,
    user,
  }: {
    title: string;
    user: User;
  }): Promise<ChatRoom> {
    const chatRoomRepository = this.dataSource.getRepository(ChatRoom);
    const chatRoomModel = new ChatRoom();
    chatRoomModel.title = title;
    chatRoomModel.user = user;
    return chatRoomRepository.save(chatRoomModel);
  }

  async findById(id: number): Promise<ChatRoom | null> {
    return this.dataSource.getRepository(ChatRoom).findOneBy({ id });
  }

  async findByUser(user: User): Promise<ChatRoom[] | null> {
    return this.dataSource.getRepository(ChatRoom).find({
      where: { user },
    });
  }

  async findByTitle(title: string): Promise<ChatRoom[] | null> {
    return this.dataSource.getRepository(ChatRoom).find({
      where: { title },
    });
  }
}
