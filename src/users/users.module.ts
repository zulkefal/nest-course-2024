import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { UsersMiddleware } from './middlewares/users/users.middleware';
import { AnotherUserMiddleware } from './middlewares/another-user/another-user.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User.entity';
import { Profile } from 'src/typeorm/entities/Profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Profile])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule implements NestModule{
  configure(consumer:MiddlewareConsumer) {
    consumer.apply(UsersMiddleware,AnotherUserMiddleware).forRoutes({
      path:"users",
      method:RequestMethod.GET
    });
  }
}
