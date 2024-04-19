import { Response } from 'express';

import { DatabaseConfig } from '@/Infrastructure/Config/database.config';
import { ChatCompletionStream } from 'openai/resources/beta/chat/completions';
import { SuggestionService } from '../../Services/suggestion';
import { SuggestionRepository } from '../../Infrastructure/Repository/suggestion.repository';
import { CreateSuggestionCommandHandler } from '../../Application/Handler/CreateSuggestionCommandHandler';
import { CreateSuggestionCommand } from '../../Application/Command/CreateSuggestionCommand';

type CreateSuggestionRequest = {
  body: {
    message: string;
    ticket_id: number;
    user_id: number;
  };
};

export class CreateSuggestionController {
  suggestionService: SuggestionService;
  createSuggestionCommandHandler: CreateSuggestionCommandHandler;

  constructor() {
    const suggestionRepository = new SuggestionRepository(DatabaseConfig);
    this.suggestionService = new SuggestionService(suggestionRepository);
    this.createSuggestionCommandHandler = new CreateSuggestionCommandHandler(
      this.suggestionService
    );
  }

  handler = async (req: CreateSuggestionRequest, res: Response) => {
    const command = new CreateSuggestionCommand(req.body);
    try {
      const suggestionMessage =
        await this.createSuggestionCommandHandler.execute(command);
      
      if (typeof suggestionMessage === 'string') {
        res.status(401).json({ error: suggestionMessage });
        return;
      }
      
      this.handleSuggestionMessage(suggestionMessage, req, res);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  private handleSuggestionMessage(
    suggestionMessage: ChatCompletionStream | string,
    req: CreateSuggestionRequest,
    res: Response
  ): void {
    if (typeof suggestionMessage === 'string') {
      res.json({ message: suggestionMessage });
    } else {
      this.streamSuggestionMessage(suggestionMessage, req, res);
    }
  }

  private streamSuggestionMessage(
    suggestionMessage: ChatCompletionStream,
    req: CreateSuggestionRequest,
    res: Response
  ): void {
    let botReplyMessage = '';
    res.writeHead(200, { 'Content-Type': 'text/plain', 'Transfer-Encoding': 'chunked' });

    suggestionMessage.on('content', (delta, snapshot) => {
      botReplyMessage += delta;
      res.write(delta);
    });

    suggestionMessage.on('end', () => {
      res.end();
      this.createReplyMessage(botReplyMessage, req);
    });
  }

  private async createReplyMessage(
    suggestionMessage: string,
    req: CreateSuggestionRequest
  ): Promise<void> {
    const replyMessagePayload = {
      message: suggestionMessage,
      user_id: req.body.user_id,
      ticket_id: req.body.ticket_id,
    };
    const replyMessageCommand = new CreateSuggestionCommand(
      replyMessagePayload
    );
    await this.createSuggestionCommandHandler.execute(replyMessageCommand);
  }
}
