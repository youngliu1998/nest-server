import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3h' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
