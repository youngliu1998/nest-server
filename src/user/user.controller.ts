import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findUser(@Request() req: any) {
    const id: number = req.user.id;
    console.log('userId Cookie:', id);
    return await this.userService.findUser(id);
  }
}
