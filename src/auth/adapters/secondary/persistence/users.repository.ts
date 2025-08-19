import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from '../../../application/ports/users.repository';
import { User } from '../../../domain/entities/user.entity';
import { DB_PROVIDER_TOKEN } from 'src/db/drizzle.provider';
import { DatabaseService } from 'src/db/database.service';
import { users } from 'src/db/user.schema';

@Injectable()
export class UsersRepositoryImpl implements UsersRepository {
  constructor(
    @Inject(DB_PROVIDER_TOKEN) 
    private readonly db: DatabaseService,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.db.query.users.findFirst({
      where: (user, {eq})=>eq(user.email, email)
    });

    if (!result) {
      return null;
    }

    return result as unknown as User;
  }

  async save(user: Omit<User, 'id'>): Promise<User> {
    const [result] = await this.db
      .insert(users)
      .values({
        ...user,
        password: user.password as string
      })
      .returning();

    return result as unknown as User;
  }
}
