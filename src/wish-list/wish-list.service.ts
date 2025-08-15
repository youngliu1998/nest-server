import { HttpException, Injectable } from '@nestjs/common';
import { WishList } from './entity/wish-list.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWishDto, deleteWishDto } from './dto/wish-list.dto';
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
    const { wishText, id } = newWish;
    console.log(newWish);
    try {
      return this.wishListRepository
        .createQueryBuilder()
        .insert()
        .into(WishList)
        .values([{ wish_text: wishText, user_id: id }])
        .execute();
    } catch (error) {
      throw new HttpException('Create wish failed', 400);
    }
  }

  async deleteWish(id: number) {
    try {
      return this.wishListRepository
        .createQueryBuilder()
        .delete()
        .from(WishList)
        .where({ id })
        .execute();
    } catch {
      throw new HttpException('Create wish failed', 400);
    }
  }
}
