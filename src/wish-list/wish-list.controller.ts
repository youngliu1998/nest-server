import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { WishListService } from './wish-list.service';
import { CreateWishDto } from './dto/wish-list.dto';
// import type { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('wish-list')
export class WishListController {
  constructor(private readonly wishListService: WishListService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getWishList(@Request() req: any) {
    const id = req.user.id;
    console.log('wishService user_id: ', id);
    const data = await this.wishListService.getWishList(id);
    return { message: 'wish-list', data };
  }

  @Post()
  async createWish(@Body(ValidationPipe) newWish: CreateWishDto) {
    return await this.wishListService.createWish({ ...newWish });
  }
}
