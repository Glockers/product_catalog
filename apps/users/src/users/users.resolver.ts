import { Resolver, Query, Args, ResolveReference } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id') id: number) {
    return this.usersService.findOneById(id);
  }

  @ResolveReference()
  async resolveReference(referance: {
    __typename: string;
    id: number;
  }): Promise<User> {
    console.log('user referance', referance.id);
    const user = await this.findOne(referance.id);
    console.log(user);
    return user;
  }
}
