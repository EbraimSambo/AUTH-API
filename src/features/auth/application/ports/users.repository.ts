import { User } from '../../domain/entities/user.entity';

export abstract class UsersRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract save(user: Omit<User, 'id'>): Promise<User>;
  abstract updateRefreshToken(userId: string, refreshToken: string | null): Promise<void>;
}
