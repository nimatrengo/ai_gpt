import { BotMessageService } from '@/Domain/Bot/Services/bot';
import { CreateBotMessageCommand } from '../Command/CreateBotMessageCommand';
import { CreateBotPayload } from '@/@types/CreateBotMessage';

export class CreateBotMessageCommandHandler {
  private botMessageService: BotMessageService;

  constructor(botMessageService: BotMessageService) {
    this.botMessageService = botMessageService;
  }

  async execute(command: CreateBotMessageCommand) {
    const data: CreateBotPayload = {
      message: command.message,
      userId: command.user,
      isReply: command.isReply,
      parentMessageId: command.parentMessageId,
      roomId: command.room_id,
    };
    const requestIsNotValid = this.botMessageService.validateRequest(data);

    if (requestIsNotValid) {
      return requestIsNotValid;
    }

    await this.botMessageService.createMessage(data);

    const replyText = await this.botMessageService.generateGpt2Reply(
      data.message
    );

    return replyText;
  }
}
