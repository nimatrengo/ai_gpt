import { IUserRepository } from '@/Domain/Authentication/Domain/RepositoryInterface/userRepositoryInterface';
import jwt from 'jsonwebtoken';
import { ITokenRepository } from '@/Domain/Authentication/Domain/RepositoryInterface/tokenRepositoryInterface';
import { User } from '../Domain/Entity/User';

const SECRET_KEY = process.env.JWT_SECRET_KEY as string;
const expiresIn = '365d';

export class UserService {
  private userRepository: IUserRepository;
  private tokenRepository: ITokenRepository;

  constructor(
    userRepository: IUserRepository,
    tokenRepository: ITokenRepository
  ) {
    this.userRepository = userRepository;
    this.tokenRepository = tokenRepository;
  }

  async registerUser(email: string): Promise<User> {
    return this.userRepository.createUser({ email });
  }

  async emailExists(email: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    return user !== null;
  }

  async registerUserAndGenerateToken(
    email: string
  ): Promise<{ token: string }> {
    const user = await this.registerUser(email);

    const token = jwt.sign({ userId: user.id, email }, SECRET_KEY, {
      expiresIn,
    });
    await this.tokenRepository.createToken({ token, user: user });

    return { token };
  }
}
