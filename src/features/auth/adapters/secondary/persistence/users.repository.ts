import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from '../../../application/ports/users.repository';
import { User } from '../../../domain/entities/user.entity';
import { DB_PROVIDER_TOKEN } from 'src/root/infrastructure/db/drizzle.provider';
import { DatabaseService } from 'src/root/infrastructure/db/database.service';
import { userTable } from 'src/root/infrastructure/schemas/user/user.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersRepositoryImpl implements UsersRepository {
  constructor(
    @Inject(DB_PROVIDER_TOKEN) 
    private readonly db: DatabaseService,
  ) {}

  async findById(id: string): Promise<User | null> {
    const result = await this.db.query.userTable.findFirst({
      where: (user, {eq})=>eq(user.id, +id)
    });

    if (!result) {
      return null;
    }

    return result as unknown as User;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.db.query.userTable.findFirst({
      where: (user, {eq})=>eq(user.email, email)
    });

    if (!result) {
      return null;
    }

    return result as unknown as User;
  }

  async save(user: Omit<User, 'id'>): Promise<User> {
    const [result] = await this.db
      .insert(userTable)
      .values({
        ...user,
        password: user.password as string
      })
      .returning();

    return result as unknown as User;
  }

  async updateRefreshToken(userId: string, refreshToken: string | null): Promise<void> {
    await this.db
      .update(userTable)
      .set({ refreshToken })
      .where(eq(userTable.id, +userId));
  }
}
