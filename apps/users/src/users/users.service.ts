import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createUserInput: CreateUserInput) {
    const createdUser = await this.userRepository.save(createUserInput);
    return createdUser;
  }

  async findAll() {
    return await this.userRepository.find();
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

  async resetRt(id: number) {
    await this.userRepository.update(
      {
        id,
        hashedRt: Not(IsNull())
      },
      {
        hashedRt: null
      }
    );
  }
}
