import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DrizzleUsersRepository } from './adapters/secondary/persistence/users.repository';
import { AuthService } from './application/services/auth.service';
import { UsersRepository } from './application/ports/users.repository';
import { AuthController } from './adapters/primary/http/auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [
    DbModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m',  },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: UsersRepository,
      useClass: DrizzleUsersRepository,
    },
  ],
})
export class AuthModule {}
