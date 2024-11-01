import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User.entity';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserProfileDto } from 'src/users/dtos/UserProfile.dto';
import { Profile } from 'src/typeorm/entities/Profile.entity';
import { CreateUserPostDto } from 'src/users/dtos/CreateUserPost.dto';
import { Post } from 'src/typeorm/entities/Post.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>


  ) {}

  async createUser(userDetails: CreateUserDto) {
    const pass= userDetails.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pass, salt);
    userDetails.password = hash;
    const newUser = this.userRepository.create({
      ...userDetails,
      createdAt: new Date(),
    });
    return await this.userRepository.save(newUser);
  }

  async fetchUsers() {
    return await this.userRepository.find({
      select: ['username'],
    });
  }

  async updateUser(id: number, updareUserDto: UpdateUserDto) {
    const findUser = await this.userRepository.findOneBy({ id });
    if (!findUser) {
      return { message: 'User not found' };
    }

    const rzlt = await this.userRepository.update({ id }, { ...updareUserDto });
    if (rzlt) {
      return { message: 'User updated successfully' };
    }
  }

  async deleteUser(id: number) {
    const findUser = await this.userRepository.findOneBy({ id });
    if (!findUser) {
      return { message: 'User not found' };
    }

    const rzlt = await this.userRepository.delete({ id });
    if (rzlt) {
      return { message: 'User deleted successfully' };
    }
  }

  async login(userDetails: CreateUserDto) {
    const user = await this.userRepository.findOne({
        where :{username: userDetails.username}
    });
    if(!user)
    {
        return {message: 'User not found'};
    }
    const pass = userDetails.password;
    const isMatch = bcrypt.compareSync(pass, user.password);
    if(isMatch)
    {
        return {message: 'User logged in successfully'};
    }
    return {message: 'Invalid password'};
  }

  async createUserProfile(id:number,userProfileDto:UserProfileDto) {

    const user = await this.userRepository.findOneBy({id});
    if(!user)
    {
        return {message: 'User not found'};
    }

    const newProfile = this.profileRepository.create({
        ...userProfileDto
    });
    const saveProfile = await this.profileRepository.save(newProfile);
    user.profile = saveProfile;
    await this.userRepository.save(user);

    return { message: 'Profile created successfully' };
  }
  
  async getRelations()
  {
    return await this.userRepository.find({
        relations: ['profile']
    })
  }

  async createUserPost(id:number,createUserPost:CreateUserPostDto)
  {
    const user = await this.userRepository.findOneBy({id});
    if(!user)
    {
        return {message: 'User not found'};
    }

    const newPost = this.postRepository.create({...createUserPost,user});
    return await this.postRepository.save(newPost);

  }

  async user_with_posts(id: number) {
    return await this.userRepository.findOne({
      where: { id: id },
      relations: ['posts'],
    });
  } 
  // fetchUsers() {
  //     return {users: [
  //         {
  //             userName: 'Zulkefal',
  //         },
  //         {
  //             userName: 'Zulkefal2',
  //         },
  //         {
  //             userName: 'Zulkefal3',
  //         },
  //     ]}
  // }
}
