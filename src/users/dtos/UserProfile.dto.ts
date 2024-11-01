import { IsNotEmpty, IsString } from "class-validator";

export class UserProfileDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;
    @IsNotEmpty()
    @IsString()
    lastName: string;
    @IsNotEmpty()
    @IsString()
    @IsNotEmpty()
    age: number;
    @IsString()
    @IsNotEmpty()
    dob: string;
}