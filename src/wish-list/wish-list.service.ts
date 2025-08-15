import { Injectable } from '@nestjs/common';
import { WishList } from './entity/wish-list.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWishDto } from './dto/wish-list.dto';
// import { Request } from 'express';

@Injectable()
export class WishListService {
  constructor(
    @InjectRepository(WishList)
    private wishListRepository: Repository<WishList>,
  ) {}

  async getWishList(id: number) {
    // const id = req.body.user.id
    console.log('user_id: ', id);
    return await this.wishListRepository.find({ where: { user_id: id } });
  }

  async createWish(newWish: CreateWishDto) {
    const { wish_text, user_id } = newWish;
    console.log(newWish);
    return this.wishListRepository
      .createQueryBuilder()
      .insert()
      .into(WishList)
      .values([{ wish_text, user_id }])
      .execute();
  }
}
