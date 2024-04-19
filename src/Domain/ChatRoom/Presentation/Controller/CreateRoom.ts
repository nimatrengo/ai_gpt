import { Response } from 'express';

import { DatabaseConfig } from '@/Infrastructure/Config/database.config';
import { UserRepository } from '@/Domain/Authentication/Infrastructure/Repository/user.repository';
import { CreateRoomCommandHandler } from '@/Domain/ChatRoom/Application/Handler/CreateRoomCommandHandler';
import { CreateRoomCommand } from '@/Domain/ChatRoom/Application/Command/CreateRoomCommand';
import { ChatRoomService } from '@/Domain/ChatRoom/Services/chatroom';
import { ChatRoomRepository } from '@/Domain/ChatRoom/Infrastructure/Repository/chatRoom.repository';

type CreateRoomRequest = {
  body: {
    title: string;
    user: {
      id: number;
    };
  };
};

export class CreateRoomController {
  chatRoomService: ChatRoomService;

  constructor() {
    this.chatRoomService = new ChatRoomService(
      new UserRepository(DatabaseConfig),
      new ChatRoomRepository(DatabaseConfig)
    );
  }

  handler = async (req: CreateRoomRequest, res: Response) => {
    const handler = new CreateRoomCommandHandler(this.chatRoomService);
    const command = new CreateRoomCommand({
      title: req.body.title,
      user: req.body.user.id,
    });

    const createChatRoom = await handler.execute(command);
    res.json(createChatRoom);
  };
}
