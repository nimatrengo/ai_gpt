export class CreateRoomCommand {
  title: string;
  user: number;

  constructor({ title, user }: { title: string; user: number }) {
    this.title = title;
    this.user = user;
  }
}
