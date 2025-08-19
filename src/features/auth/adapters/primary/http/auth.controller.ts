import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../../../application/services/auth.service';
import { SignInDto } from '../../../domain/dto/sign-in.dto';
import { SignUpDto } from '../../../domain/dto/sign-up.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { GetCurrentUser } from './decorators/get-current-user.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered.' })
  @ApiResponse({ status: 409, description: 'User with this email already exists.' })
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    return this.authService.signUp(signUpDto);
  }

  @Post('sign-in')
  @ApiOperation({ summary: 'Log in a user' })
  @ApiResponse({ status: 200, description: 'User successfully logged in.' })
  @ApiResponse({ status: 403, description: 'Invalid credentials.' })
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInDto: SignInDto): Promise<{ accessToken: string, refreshToken: string }> {
    return this.authService.signIn(signInDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiOperation({ summary: 'Log out the current user' })
  @ApiResponse({ status: 204, description: 'User successfully logged out.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@GetCurrentUser('sub') userId: string): Promise<void> {
    return this.authService.logout(userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh the access token' })
  @ApiResponse({ status: 200, description: 'Tokens successfully refreshed.' })
  @ApiResponse({ status: 403, description: 'Access Denied.' })
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUser('sub') userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<{ accessToken: string, refreshToken: string }> {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  @ApiOperation({ summary: 'Get the current user' })
  @ApiResponse({ status: 200, description: 'User successfully retrieved.' })
  @ApiResponse({ status: 403, description: 'Access Denied.' })
  getUser(
    @Req() req: Request
  ){
    return req.user
  }
}
