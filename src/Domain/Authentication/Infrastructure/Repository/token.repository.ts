import { ITokenRepository } from '@/Domain/Authentication/Domain/RepositoryInterface/tokenRepositoryInterface';
import { User } from '@/Domain/Authentication/Domain/Entity/User';
import { DataSource } from 'typeorm';
import { Token } from '@/Domain/Authentication/Domain/Entity/Token';

export class TokenRepository implements ITokenRepository {
  constructor(private dataSource: DataSource) {}

  async createToken({
    token,
    user,
  }: {
    token: string;
    user: User;
  }): Promise<Token> {
    const tokenRepository = this.dataSource.getRepository(Token);
    const tokenModel = new Token();
    tokenModel.token = token;
    tokenModel.user = user;
    return tokenRepository.save(tokenModel);
  }
}
