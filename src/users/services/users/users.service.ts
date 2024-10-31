import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User.entity';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor (
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
        
    ){}   

    async createUser(userDetails:CreateUserDto){
        const newUser = this.userRepository.create({...userDetails,
            createdAt:new Date(),
        });
        return await this.userRepository.save(newUser);
    }

    async fetchUsers(){
        return await this.userRepository.find({
            select: ["username"],
          });    }
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
