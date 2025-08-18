import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import type { Response } from 'express';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  createUser(@Body(ValidationPipe) newUser: SignupDto) {
    return this.authService.createUser(newUser);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body(ValidationPipe) loginUser: LoginDto,
  ) {
    const user = await this.authService.login(loginUser);
    const { id, name, email, user_token } = user;

    res.cookie('user_token', user_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 3 * 60 * 60 * 1000, // 3 hours
    });

    return { message: 'Login successful', data: { id, name, email } };
  }

  @Post('logout')
  @HttpCode(200)
  logout(@Res({ passthrough: true }) res: Response) {
    console.log('user_token clear');
    res.clearCookie('user_token', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
    return { message: 'Logout successful' };
  }

  @Get() // for test
  find() {
    return this.authService.find();
  }
}
