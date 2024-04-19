import { CreateSuggestionPayload } from '@/@types/CreateSuggestionPayload';
import { SuggestionService } from '../../Services/suggestion';
import { PromptEngAutoSuggestionBySubjectGPT } from '../../Domain/Prompts';

export class CreateSuggestionCommandHandler {
  private createSuggestionService: SuggestionService;

  constructor(createSuggestionService: SuggestionService) {
    this.createSuggestionService = createSuggestionService;
  }

  async execute(command: CreateSuggestionPayload) {
    const data: CreateSuggestionPayload = {
      message: command.message,
      userId: command.userId,
      ticketId: command.ticketId,
    };

    const requestIsNotValid =
      this.createSuggestionService.validateRequest(data);

    if (requestIsNotValid) {
      return requestIsNotValid;
    }

    await this.createSuggestionService.createMessage(data);

    const inputMessage = PromptEngAutoSuggestionBySubjectGPT(
      data.message,
      'TEST'
    );
    
    const replyText =
      await this.createSuggestionService.generateGpt2Reply(inputMessage);

    return replyText;
  }
}
