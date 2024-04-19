import { Request, Response } from 'express';
import { DatabaseConfig } from '@/Infrastructure/Config/database.config';
import { RegisterCommand } from '@/Domain/Authentication/Application/Command/RegisterCommand';
import { UserService } from '@/Domain/Authentication/Services/user';
import { RegisterCommandHandler } from '@/Domain/Authentication/Application/Handler/RegisterCommandHandler';
import { UserRepository } from '@/Domain/Authentication/Infrastructure/Repository/user.repository';
import { TokenRepository } from '@/Domain/Authentication/Infrastructure/Repository/token.repository';

export class RegisterController {
  userService: UserService;

  constructor() {
    this.userService = new UserService(
      new UserRepository(DatabaseConfig),
      new TokenRepository(DatabaseConfig)
    );
  }

  handler = async (req: Request, res: Response) => {
    const { email } = req.body;
    const emailTaken = await this.userService.emailExists(email);

    if (emailTaken) {
      return res.status(400).json({ message: 'Email is already taken.' });
    }

    const handler = new RegisterCommandHandler(this.userService);
    const command = new RegisterCommand(req.body);

    const register = await handler.execute(command);

    res.json(register);
  };
}
