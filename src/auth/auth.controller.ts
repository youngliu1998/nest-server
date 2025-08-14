import {
  Body,
  Controller,
  Get,
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

  @Post('login')
  login(
    @Res({ passthrough: true }) res: Response,
    @Body(ValidationPipe) loginUser: LoginDto,
  ) {
    const user = this.authService.login(loginUser);
    if (!user) return { messge: 'Login fail' };
    res.cookie('user_token', 'my default jwt secret', {
      httpOnly: true,
      secure: false,
      maxAge: 3 * 60 * 60 * 1000, // 3 hours
    });

    return { messge: 'Login successful', user };
  }

  @Get() // for test
  find() {
    return this.authService.find();
  }
}
