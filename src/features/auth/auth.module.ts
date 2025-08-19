import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersRepositoryImpl } from './adapters/secondary/persistence/users.repository';
import { AuthService } from './application/services/auth.service';
import { UsersRepository } from './application/ports/users.repository';
import { AuthController } from './adapters/primary/http/auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './adapters/primary/http/strategies/jwt.strategy';
import { DbModule } from 'src/root/infrastructure/db/db.module';

@Module({
  imports: [
    DbModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('EXPIRES_IN'),  },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: UsersRepository,
      useClass: UsersRepositoryImpl,
    },
    JwtStrategy,
  ],
})
export class AuthModule {}
