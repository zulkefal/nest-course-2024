import { Body, Controller, Get, Param, Post, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

@Controller('users')
export class UsersController {
  @Get()
  getUsers() {
    return {
      userName: 'Zulkefal',
    };
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

  @Post('')
  createUser(@Body() userData: CreateUserDto) {
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
}
