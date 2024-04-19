import { UserService } from '../../Services/user';
import { RegisterCommand } from '../Command/RegisterCommand';

export class RegisterCommandHandler {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async execute(command: RegisterCommand) {
    return this.userService.registerUserAndGenerateToken(command.email);
  }
}
