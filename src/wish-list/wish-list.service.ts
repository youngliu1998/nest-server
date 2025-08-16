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

  async updateWishStatus(id: number) {
    try {

      // ==== get is_completed from the wishItem

      const wishItem: any = await this.wishListRepository.find({
        where: { id },
      });
      const isCompleted = wishItem[0].is_completed;
      console.log('isCompleted', isCompleted);

      // ==== update the state ====
      
      return this.wishListRepository
        .createQueryBuilder()
        .update(WishList)
        .set({ is_completed: !isCompleted })
        .where({ id })
        .execute();
    } catch (error) {
      throw new HttpException('update wish status failed', 400);
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
