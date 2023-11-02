import { AuthCommunicationHelper } from '@app/common/microservice';
import { Tokens } from '@app/common/types/tokens.type';
import { Injectable } from '@nestjs/common';
import { GET_USER_ID } from '../constants';

@Injectable()
export class UserHelper {
  constructor(private readonly authClient: AuthCommunicationHelper) {}

  async getUserID(tokens: Tokens): Promise<number> {
    try {
      return await this.authClient.sentToMicroservice<number>(GET_USER_ID, {
        tokens
      });
    } catch {
      throw new Error('User not found');
    }
  }
}
