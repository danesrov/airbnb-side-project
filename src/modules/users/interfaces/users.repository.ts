import { IRepository } from 'src/core/repositories/general';
import { User } from '../model/user';

export interface IUserRepository extends IRepository<User, number> {
  getByEmail(email: string): Promise<User | null>;
}
