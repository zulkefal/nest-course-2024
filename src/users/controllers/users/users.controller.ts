import { Controller, Get } from '@nestjs/common';

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
}
