import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { AuthGuard } from 'src/users/guards/auth/auth.guard';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {

  constructor (private usersService: UsersService){

  }

  @Get()
  getUsers() {
   const res = this.usersService.fetchUsers();
   return res;
  }

  @Get('posts')
  getUserPosts() {
    return [
      {
        title: 'Post 1',
        content: 'This is the content of post 1',
      },
      {
        title: 'Post 2',
        content: 'This is the content of post 2',
      },
    ];
  }

  @Get('posts/comments')
  userPostsComments() {
    return [
      {
        id: 1,
        title: 'Post 1',
        comments: [
          {
            id: 1,
            content: 'This is the comment of post 1',
          },
          {
            id: 2,
            content: 'This is the comment of post 1',
          },
        ],
      },
    ];
  }

  // @Post('')
  // createUser(@Req() req:Request,@Res() res:Response) {
  //   console.log("Req:",req.body);
  //   res.send("User created successfully");
  // }

  @Post('/createUser')
  @UsePipes(new ValidationPipe())
  createUser(@Body(ValidateCreateUserPipe) userData: CreateUserDto) {
    console.log('User Data:', userData);
    return userData;
  }

  @Get(':id/:name')
  getUserbyId(@Param('id') id: string, @Param('name') name: string) {
    return {
      id,
      name,
    };
  }

  @Get('sort')
  searchUser(@Query('sortBy') sortBy) {
    console.log(sortBy)
  }

  @Put(":id")
  updateUserId(@Param('id',ParseIntPipe) id: number) {
    
  }
}
