import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  private readonly users: User[] = [];
  async create(createUserInput: CreateUserInput) {
    const createdUser = await this.userRepository.save(createUserInput);
    return createdUser;
  }

  findAll() {
    return this.users;
  }

  async findOneById(id: number) {
    return await this.userRepository.findOneBy({
      id
    });
  }

  async findOneByLogin(login: string) {
    return await this.userRepository.findOneBy({
      login
    });
  }
}
