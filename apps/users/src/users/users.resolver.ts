import { Resolver, Query, Args, ResolveReference } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { LoggerService } from '@app/common/logger/logger.service';
import { UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '@app/common/filters';

@Resolver(() => User)
@UseFilters(HttpExceptionFilter)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: LoggerService
  ) {}

  @Query(() => [User], { name: 'users' })
  findAll() {
    const result = this.usersService.findAll();
    this.logger.log('Users retrieved successfully', 'UsersResolver');
    return result;
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id') id: number) {
    const result = this.usersService.findOneById(id);
    this.logger.log(
      `User with ID ${id} retrieved successfully`,
      'UsersResolver'
    );
    return result;
  }

  @ResolveReference()
  async resolveReference(referance: {
    __typename: string;
    id: number;
  }): Promise<User> {
    const user = await this.findOne(referance.id);
    return user;
  }
}
