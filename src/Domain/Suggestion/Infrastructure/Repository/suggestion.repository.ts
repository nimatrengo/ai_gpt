import { User } from '@/Domain/Authentication/Domain/Entity/User';
import { DataSource } from 'typeorm';
import { ISuggestionRepository } from '../../Domain/RepositoryInterface/botMessageRepositoryInterface';
import { Suggestion } from '../../Domain/Entity/Suggestion';

export class SuggestionRepository implements ISuggestionRepository {
  constructor(private dataSource: DataSource) {}

  async createMessage({
    message,
    userId,
    ticketId,
  }: {
    message: string;
    userId: number;
    ticketId: number;
  }): Promise<Suggestion> {
    const botSuggestionRepository = this.dataSource.getRepository(Suggestion);
    const botSuggestionModel = new Suggestion();
    botSuggestionModel.message = message;
    botSuggestionModel.userId = userId;
    botSuggestionModel.ticketId = ticketId;
    return botSuggestionRepository.save(botSuggestionModel);
  }

  async findById(id: number): Promise<Suggestion[] | null> {
    return this.dataSource.getRepository(Suggestion).find({
      where: { id },
    });
  }

  async findByUser(user: User): Promise<Suggestion[] | null> {
    return this.dataSource.getRepository(Suggestion).find({
      where: { userId: user.id },
    });
  }
}
