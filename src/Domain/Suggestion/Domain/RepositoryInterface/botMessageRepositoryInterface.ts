import { User } from '@/Domain/Authentication/Domain/Entity/User';
import { Suggestion } from '../Entity/Suggestion';
import { CreateSuggestionPayload } from '@/@types/CreateSuggestionPayload';

export interface ISuggestionRepository {
  createMessage(data: CreateSuggestionPayload): Promise<Suggestion>;
  findById(id: number): Promise<Suggestion[] | null>;
  findByUser(user: User): Promise<Suggestion[] | null>;
}
