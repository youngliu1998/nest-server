import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import * as argon from 'argon2';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
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
      return { msg: `sign-up fail: ${err}` };
    }
  }
  async login(loginUser: LoginDto) {
    const { email, password } = loginUser;
    try {
      const hash = await argon.hash(password);
      const user = await this.userRepository.findOne({
        where: { email, password: hash },
      });
      if (!user) {
        throw new Error('no this user');
      }
      const { id, name } = user;
      return { id, name, email };
    } catch (err) {
      return null;
    }
  }
}
