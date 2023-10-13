import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];
  create(createUserInput: CreateUserInput) {
    // return 'This action adds a new user';
    this.users.push(createUserInput);
    return createUserInput;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const res = this.users.find((user) => user.id === id) || null;
    return res;
  }
}
