import { IsEmail, IsInt, isString, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class UserDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  avatar: string;

  @IsString()
  createdAt: string;
}
export class FindUserDto extends PartialType(UserDto) {}
export class CreateUserDto extends PartialType(UserDto) {}
