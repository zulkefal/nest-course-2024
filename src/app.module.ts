import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User.entity';
import { Profile } from './typeorm/entities/Profile.entity';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'admin',
    database:'nestJs_Sql_tutorial',
    entities: [User,Profile],
    synchronize: false,
  }),UsersModule]})
export class AppModule {}
