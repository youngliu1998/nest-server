import { IsInt, IsNotEmpty, IsString } from '@nestjs/class-validator';

export class WishListDto {
  wish_text: string;
  isCompleted: boolean;
}

export class CreateWishDto {
  @IsString()
  @IsNotEmpty()
  wish_text: string = '';

  @IsInt()
  @IsNotEmpty()
  user_id: number;
}
