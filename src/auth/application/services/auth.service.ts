import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../ports/users.repository';
import { SignUpDto } from 'src/auth/domain/dto/sign-up.dto';
import { SignInDto } from 'src/auth/domain/dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const user = await this.usersRepository.findByEmail(signUpDto.email)
    if (user) {
      throw new ConflictException('User existing');
    }
    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);
    await this.usersRepository.save({
      ...signUpDto,
      password: hashedPassword,
    });
  }

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const user = await this.usersRepository.findByEmail(signInDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      signInDto.password,
      user.password as string,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
