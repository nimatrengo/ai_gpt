import { User } from '../Entity/User';

export interface ITokenRepository {
  createToken(data: { token: string; user: User }): Promise<any>;
}
