import { Module } from '@nestjs/common';
import { WishListService } from './wish-list.service';

@Module({
  providers: [WishListService]
})
export class WishListModule {}
