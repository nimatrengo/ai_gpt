import { Client } from '@elastic/elasticsearch';
import { Suggestion } from '../Domain/Entity/Suggestion';
import { ISuggestionRepository } from '../Domain/RepositoryInterface/botMessageRepositoryInterface';
import OpenAI from 'openai';
import { ChatCompletionStream } from 'openai/resources/beta/chat/completions';
import { CreateSuggestionPayload } from '@/@types/CreateSuggestionPayload';

export class SuggestionService {
  private suggestionRepository: ISuggestionRepository;
  private openai: OpenAI;
  private elasticsearch: Client;

  constructor(suggestionRepository: ISuggestionRepository) {
    this.suggestionRepository = suggestionRepository;
    this.openai = new OpenAI({
      apiKey: process.env['OPENAI_API_KEY'],
    });

    this.elasticsearch = new Client({
      node: process.env.ELASTICSEARCH_HOST
    });
  }

  async createMessage({
    message,
    userId,
    ticketId,
  }: CreateSuggestionPayload): Promise<Suggestion> {
    return this.suggestionRepository.createMessage({
      message,
      userId,
      ticketId,
    });
  }

  async storeReplyMessage({
    message,
    userId,
    ticketId,
  }: CreateSuggestionPayload): Promise<Suggestion> {
    return this.suggestionRepository.createMessage({
      message,
      userId,
      ticketId,
    });
  }

  validateRequest({ message }: { message: string }): string | null {
    if (!message) {
      return 'Mandatory fields are missing';
    }
    return null;
  }

  uploadTextToElasticsearch(userId: number, document: { content: string }) { 
    return this.elasticsearch.index({
      index: `user_${userId}_documents`,
      body: {
        content: document.content,
        timestap: new Date(),
      }
    });
  }

  async getDocuments(userId: number, inputText: string) {
    const {hits} = await this.elasticsearch.search({
      index: `user_${userId}_documents`,
      body: {
        query: {
          match: { content: inputText }
        }
      }
    });

    return hits.hits.map(hit => hit._source);
  }

  async generateGpt2Reply(inputText: string): Promise<ChatCompletionStream> {
    console.log("ELASTIC SEARCH:",await this.getDocuments(1, inputText));
    // this.uploadTextToElasticsearch(1, { content: inputText });
    const stream = await this.openai.beta.chat.completions.stream({
      model: 'gpt-3.5-turbo-16k-0613',
      messages: [{ role: 'assistant', content: inputText }],
      stream: true,
    });
    return stream;
  }
}
