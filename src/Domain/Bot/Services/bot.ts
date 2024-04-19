import { IUserRepository } from '@/Domain/Authentication/Domain/RepositoryInterface/userRepositoryInterface';
import { BotMessage } from '../Domain/Entity/BotMessage';
import { IBotMessageRepository } from '../Domain/RepositoryInterface/botMessageRepositoryInterface';
import OpenAI from 'openai';
import { ChatCompletionStream } from 'openai/resources/beta/chat/completions';
import { CreateBotPayload } from '@/@types/CreateBotMessage';
import { IChatRoomRepository } from '@/Domain/ChatRoom/Domain/RepositoryInterface/chatRoomRepositoryInterface';

export class BotMessageService {
  private userRepository: IUserRepository;
  private chatRoomRepository: IChatRoomRepository;
  private botMessageRepository: IBotMessageRepository;
  private openai: OpenAI;

  constructor(
    userRepository: IUserRepository,
    botMessageRepository: IBotMessageRepository,
    chatRoomRepository: IChatRoomRepository
  ) {
    this.userRepository = userRepository;
    this.chatRoomRepository = chatRoomRepository;
    this.botMessageRepository = botMessageRepository;
    this.openai = new OpenAI({
      apiKey: process.env['OPENAI_API_KEY'],
    });
  }

  async createMessage({
    message,
    userId,
    isReply,
    parentMessageId,
    roomId,
  }: CreateBotPayload): Promise<BotMessage> {
    const user = await this.userRepository.findByUserId(userId.id);
    const room = await this.chatRoomRepository.findById(roomId);
    if (!user) {
      throw new Error('User not found');
    }
    if (!room) {
      throw new Error('Room not found');
    }
    return this.botMessageRepository.createMessage({
      message,
      isReply,
      user,
      parentMessageId,
      roomId: room,
    });
  }

  async storeReplyMessage({
    message,
    userId,
    parentMessageId,
    roomId,
  }: CreateBotPayload): Promise<BotMessage> {
    const user = await this.userRepository.findByUserId(userId.id);
    const room = await this.chatRoomRepository.findById(roomId);

    if (!user) {
      throw new Error('User not found');
    }
    if (!room) {
      throw new Error('Room not found');
    }
    return this.botMessageRepository.createMessage({
      message,
      isReply: true,
      user,
      parentMessageId,
      roomId: room,
    });
  }

  validateRequest({ message }: { message: string }): string | null {
    if (!message) {
      return 'Mandatory fields are missing';
    }
    return null;
  }

  async generateGpt2Reply(inputText: string): Promise<ChatCompletionStream> {
    const stream = await this.openai.beta.chat.completions.stream({
      model: 'gpt-3.5-turbo-16k-0613',
      messages: [{ role: 'user', content: inputText }],
      stream: true,
    });
    return stream;
  }
}
