import { CreateRoomCommand } from '../Command/CreateRoomCommand';
import { ChatRoomService } from '@/Domain/ChatRoom/Services/chatroom';

export class CreateRoomCommandHandler {
  private chatRoomService: ChatRoomService;

  constructor(chatRoomService: ChatRoomService) {
    this.chatRoomService = chatRoomService;
  }

  async execute(command: CreateRoomCommand) {
    const data = {
      title: command.title,
      userId: command.user,
    };
    const requestIsNotValid = this.chatRoomService.validateRequest(data);

    if (requestIsNotValid) {
      return requestIsNotValid;
    }

    return this.chatRoomService.createChatroom(data);
  }
}
