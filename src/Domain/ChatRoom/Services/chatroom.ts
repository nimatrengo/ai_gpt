import { IUserRepository } from '@/Domain/Authentication/Domain/RepositoryInterface/userRepositoryInterface';
import { ChatRoom } from '../Domain/Entity/ChatRoom';
import { IChatRoomRepository } from '../Domain/RepositoryInterface/chatRoomRepositoryInterface';

export class ChatRoomService {
  private userRepository: IUserRepository;
  private chatRoomRepository: IChatRoomRepository;

  constructor(
    userRepository: IUserRepository,
    chatRoomRepository: IChatRoomRepository
  ) {
    this.userRepository = userRepository;
    this.chatRoomRepository = chatRoomRepository;
  }

  async createChatroom({
    title,
    userId,
  }: {
    title: string;
    userId: number;
  }): Promise<ChatRoom> {
    const user = await this.userRepository.findByUserId(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return this.chatRoomRepository.createRoom({ title, user });
  }

  validateRequest({ title }: { title: string }): string | null {
    if (!title) {
      return 'Mandatory fields are missing';
    }
    return null;
  }
}
