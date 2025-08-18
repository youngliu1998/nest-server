import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import * as argon from 'argon2';
import { LoginDto } from './dto/login.dto';
import { error } from 'console';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async find() {
    return this.userRepository.find();
  }

  async createUser(newUser: SignupDto) {
    const { name, email, password } = newUser;
    try {
      const hash = await argon.hash(password);
      return this.userRepository
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([{ name, email, password: hash }])
        .execute();
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Sign up failed',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  async login(loginUser: LoginDto) {
    // ==== verify user ====

    const { email, password } = loginUser;
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });
      if (!user) {
        throw new UnauthorizedException();
      }

      const hash = user.password;
      if (!(await argon.verify(hash, password))) {
        throw new UnauthorizedException();
      }

      // ==== jwt token ====

      const { id, name } = user;
      const payload = { id, name };
      const user_token = await this.jwtService.signAsync(payload, {
        secret: process.env.SECRETKEY,
      });
      console.log('user_token: ', user_token);
      return { id, name, email, user_token };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Authentication failed',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
}
