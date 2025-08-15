import { IsInt, IsNotEmpty, IsString } from '@nestjs/class-validator';

export class WishListDto {
  wish_text: string;
  isCompleted: boolean;
}

export class CreateWishDto {
  @IsString()
  @IsNotEmpty()
  wishText: string = '';

  @IsInt()
  @IsNotEmpty()
  id: number;
}

export class CreateWishTextDto {
  @IsString()
  @IsNotEmpty()
  wishText: string = '';
}

export class deleteWishDto {
  @IsInt()
  @IsNotEmpty()
  id: number = 0;
}
