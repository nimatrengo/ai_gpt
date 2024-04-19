import { IUserRepository } from '@/Domain/Authentication/Domain/RepositoryInterface/userRepositoryInterface';
import { User } from '@/Domain/Authentication/Domain/Entity/User';
import { DataSource } from 'typeorm';

export class UserRepository implements IUserRepository {
  constructor(private dataSource: DataSource) {}

  async createUser({ email }: { email: string }): Promise<User> {
    const userRepository = this.dataSource.getRepository(User);
    const user = new User();
    user.email = email;
    return userRepository.save(user);
  }

  async findByUserId(userId: number): Promise<User | null> {
    return this.dataSource.getRepository(User).findOneBy({ id: userId });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.dataSource.getRepository(User).findOneBy({ email });
  }
}
