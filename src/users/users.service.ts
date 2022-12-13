import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  //   private users: User[] = [];

  //   findAll(): User[] {
  //     return this.users;
  //   }

  //   findById(userId: number): User {
  //     return this.users.find((user) => user.id === userId);
  //   }
  createUser(createUserDto: CreateUserDto): User {
    const newUser = { ...createUserDto };
    // this.users.push(newUser);
    return newUser;
  }
}
