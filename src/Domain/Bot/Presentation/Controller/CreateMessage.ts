import { Response } from 'express';

import { BotMessageService } from '@/Domain/Bot/Services/bot';
import { BotMessageRepository } from '@/Domain/Bot/Infrastructure/Repository/botMessage.repository';
import { DatabaseConfig } from '@/Infrastructure/Config/database.config';
import { UserRepository } from '@/Domain/Authentication/Infrastructure/Repository/user.repository';
import { CreateBotMessageCommand } from '@/Domain/Bot/Application/Command/CreateBotMessageCommand';
import { CreateBotMessageCommandHandler } from '@/Domain/Bot/Application/Handler/CreateBotMessageCommandHandler';
import { BotMessage } from '@/Domain/Bot/Domain/Entity/BotMessage';
import { ChatRoomRepository } from '@/Domain/ChatRoom/Infrastructure/Repository/chatRoom.repository';
import { User } from '@/Domain/Authentication/Domain/Entity/User';
import { ChatCompletionStream } from 'openai/resources/beta/chat/completions';

type BotMessageRequest = {
  body: {
    message: string;
    isReply: boolean;
    user: User;
    parentMessageId: BotMessage | null;
    room_id: number;
  };
};

export class CreateMessageController {
  botMessageService: BotMessageService;
  createBotMessageCommandHandler: CreateBotMessageCommandHandler;

  constructor() {
    const userRepository = new UserRepository(DatabaseConfig);
    const botMessageRepository = new BotMessageRepository(DatabaseConfig);
    const chatRoomRepository = new ChatRoomRepository(DatabaseConfig);
    this.botMessageService = new BotMessageService(
      userRepository,
      botMessageRepository,
      chatRoomRepository
    );
    this.createBotMessageCommandHandler = new CreateBotMessageCommandHandler(
      this.botMessageService
    );
  }

  handler = async (req: BotMessageRequest, res: Response) => {
    const command = new CreateBotMessageCommand(req.body);
    try {
      const botMessage =
        await this.createBotMessageCommandHandler.execute(command);
      this.handleBotMessage(botMessage, req, res);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  private handleBotMessage(
    botMessage: ChatCompletionStream | string,
    req: BotMessageRequest,
    res: Response
  ): void {
    if (typeof botMessage === 'string') {
      res.json({ message: botMessage });
    } else {
      this.streamBotMessage(botMessage, req, res);
    }
  }

  private streamBotMessage(
    botMessage: ChatCompletionStream,
    req: BotMessageRequest,
    res: Response
  ): void {
    let botReplyMessage = '';
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Transfer-Encoding': 'chunked',
    });

    botMessage.on('message', (data) => {
      botReplyMessage += data.content + '\n';
      res.write(data.content + '\n');
    });

    botMessage.on('end', () => {
      res.end();
      this.createReplyMessage(botReplyMessage, req);
    });
  }

  private async createReplyMessage(
    botReplyMessage: string,
    req: BotMessageRequest
  ): Promise<void> {
    const replyMessagePayload = {
      message: botReplyMessage,
      user: req.body.user,
      isReply: true,
      parentMessageId: null,
      room_id: req.body.room_id,
    };
    const replyMessageCommand = new CreateBotMessageCommand(
      replyMessagePayload
    );
    await this.createBotMessageCommandHandler.execute(replyMessageCommand);
  }
}
