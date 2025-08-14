import { Module } from '@nestjs/common';
import { WishListService } from './wish-list.service';
import { WishListController } from './wish-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishList } from './entity/wish-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WishList])],
  providers: [WishListService],
  controllers: [WishListController],
})
export class WishListModule {}
