import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { WishListService } from './wish-list.service';
import { CreateWishDto } from './dto/wish-list.dto';

@Controller('wish-list')
export class WishListController {
  constructor(private readonly wishListService: WishListService) {}

  @Get('')
  async getWishList() {
    const data = await this.wishListService.getWishList();
    return { message: 'wish-list', data };
  }

  @Post()
  async createWish(@Body(ValidationPipe) newWish: CreateWishDto) {
    return await this.wishListService.createWish({ ...newWish });
  }
}
