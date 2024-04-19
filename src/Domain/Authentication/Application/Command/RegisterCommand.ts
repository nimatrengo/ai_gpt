export class RegisterCommand {
  email: string;

  constructor({ email }: { email: string }) {
    this.email = email;
  }
}
