import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersRepositoryImpl } from './adapters/secondary/persistence/users.repository';
import { AuthService } from './application/services/auth.service';
import { UsersRepository } from './application/ports/users.repository';
import { AuthController } from './adapters/primary/http/auth.controller';
import { JwtStrategy } from './adapters/primary/http/strategies/jwt.strategy';
import { DbModule } from 'src/root/infrastructure/db/db.module';
import { JwtRefreshStrategy } from './adapters/primary/http/strategies/jwt-refresh.strategy';

@Module({
  imports: [
    DbModule,
    PassportModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: UsersRepository,
      useClass: UsersRepositoryImpl,
    },
    JwtStrategy,
    JwtRefreshStrategy,
  ],
})
export class AuthModule {}
