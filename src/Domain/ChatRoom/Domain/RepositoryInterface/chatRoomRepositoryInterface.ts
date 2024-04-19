import { User } from '@/Domain/Authentication/Domain/Entity/User';
import { ChatRoom } from '../Entity/ChatRoom';

export interface IChatRoomRepository {
  createRoom(data: { title: string; user: User }): Promise<ChatRoom>;
  findById(id: number): Promise<ChatRoom | null>;
}
