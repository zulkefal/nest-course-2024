import { IsEmail, IsNotEmpty, isNumber, IsNumber, IsNumberString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    userName: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @MinLength(8)
    password: string ;
    @IsNotEmpty()
    @IsNumberString()
    age:Number
}