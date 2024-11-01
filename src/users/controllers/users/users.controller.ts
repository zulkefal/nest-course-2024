import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { UserProfileDto } from 'src/users/dtos/UserProfile.dto';
import { AuthGuard } from 'src/users/guards/auth/auth.guard';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.fetchUsers();
  }

  @Post('createUser')
  createUser(@Body() createUserDto:CreateUserDto){
    return this.usersService.createUser(createUserDto);
 
  }

  @Put(':id')
  updateUserId(@Param('id', ParseIntPipe) id: number, @Body() updareUserDto:UpdateUserDto) {
    return this.usersService.updateUser(id,updareUserDto);
  }

  @Delete(':id')
  deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }

  @Post('login')
  login(@Body() createUser:CreateUserDto){
    return this.usersService.login(createUser);
  }

  @Post(":id/profiles")
  createUserProfile(@Param('id',ParseIntPipe) id:number,@Body() userProfileDto:UserProfileDto){
    return this.usersService.createUserProfile(id,userProfileDto);
  }
  // @Get()
  // getUsers() {
  //   const res = this.usersService.fetchUsers();
  //   return res;
  // }

  // @Get('posts')
  // getUserPosts() {
  //   return [
  //     {
  //       title: 'Post 1',
  //       content: 'This is the content of post 1',
  //     },
  //     {
  //       title: 'Post 2',
  //       content: 'This is the content of post 2',
  //     },
  //   ];
  // }

  // @Get('posts/comments')
  // userPostsComments() {
  //   return [
  //     {
  //       id: 1,
  //       title: 'Post 1',
  //       comments: [
  //         {
  //           id: 1,
  //           content: 'This is the comment of post 1',
  //         },
  //         {
  //           id: 2,
  //           content: 'This is the comment of post 1',
  //         },
  //       ],
  //     },
  //   ];
  // }

  // @Post('')
  // createUser(@Req() req:Request,@Res() res:Response) {
  //   console.log("Req:",req.body);
  //   res.send("User created successfully");
  // }

  // @Post('/createUser')
  // @UsePipes(new ValidationPipe())
  // createUser(@Body(ValidateCreateUserPipe) userData: CreateUserDto) {
  //   console.log('User Data:', userData);
  //   return userData;
  // }

  // @Get(':id/:name')
  // getUserbyId(@Param('id') id: string, @Param('name') name: string) {
  //   return {
  //     id,
  //     name,
  //   };
  // }

  // @Get('sort')
  // searchUser(@Query('sortBy') sortBy) {
  //   console.log(sortBy);
  // }

  // @Put(':id')
  // updateUserId(@Param('id', ParseIntPipe) id: number) {}
}
