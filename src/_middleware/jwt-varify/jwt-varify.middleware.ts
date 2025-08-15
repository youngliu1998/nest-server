import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class JwtVarifyMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    // const { user_token } = req.cookies;
    // if (!user_token) console.log('jwtMiddle: no cookie');
    try {
      console.log('PORT:', process.env.PORT);
      // console.log('jwtMiddle getCookied: ', user_token);
      const user = await this.jwtService.verifyAsync('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkFpbWVyIiwiaWF0IjoxNzU1MjQzMjI3LCJleHAiOjE3NTUyNTQwMjd9.Zrjd5uZW_oBjXcGUVBfSDUG9RhJNEG4eiq4WELJLcOQ', {
        secret: 'example',
      });

      req.body.user = user;
      console.log('jwtMiddle success: ', user);
      next();
    } catch (error) {

      // ==== token varify fail ====

      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'jwtMiddle failed',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
}
