import {
  IsEmail,
  IsNotEmpty,
  isNumber,
  IsNumber,
  IsNumberString,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsNotEmpty()
  password: string;
}
