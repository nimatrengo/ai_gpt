export class CreateSuggestionCommand {
  message: string;
  userId: number;
  ticketId: number;

  constructor({
    message,
    user_id,
    ticket_id,
  }: {
    message: string;
    user_id: number;
    ticket_id: number;
  }) {
    this.message = message;
    this.userId = user_id;
    this.ticketId = ticket_id;
  }
}
