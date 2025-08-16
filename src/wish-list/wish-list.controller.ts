import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { WishListService } from './wish-list.service';
import {
  CreateWishDto,
  CreateWishTextDto,
  deleteWishDto,
} from './dto/wish-list.dto';
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

  @UseGuards(AuthGuard)
  @Post()
  async createWish(
    @Body(ValidationPipe) newWishText: CreateWishTextDto,
    @Request() req: any,
  ) {
    const { wishText } = newWishText;
    const id: number = req.user.id;
    const newWish = { id, wishText };
    return await this.wishListService.createWish({ ...newWish });
  }

  @UseGuards(AuthGuard)
  @Patch()
  updateWishStatus(@Body() updateWish: any) {
    return this.wishListService.updateWishStatus(updateWish.id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteWish(@Param('id', ValidationPipe) id: number) {
    return await this.wishListService.deleteWish(id);
  }
}
