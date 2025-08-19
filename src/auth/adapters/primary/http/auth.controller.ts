import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../../../application/services/auth.service';
import { SignInDto } from '../../../domain/dto/sign-in.dto';
import { SignUpDto } from '../../../domain/dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    return this.authService.signUp(signUpDto);
  }

  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(signInDto);
  }
}
