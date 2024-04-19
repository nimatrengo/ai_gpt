import { User } from '../Entity/User';

export interface IUserRepository {
  createUser(user: { email: string }): Promise<any>;
  findByEmail(email: string): Promise<User | null>;
  findByUserId(userId: number): Promise<User | null>;
}
