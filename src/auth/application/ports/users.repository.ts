import { User } from '../../domain/entities/user.entity';

export abstract class UsersRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract save(user: Omit<User, 'id'>): Promise<User>;
}
