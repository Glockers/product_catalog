import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

export abstract class MicroserviceCommunication {
  constructor(protected readonly client: ClientProxy) {}

  async sentToMicroservice<T>(endpoint: string, data: unknown) {
    return await lastValueFrom(this.client.send<T>(endpoint, data));
  }
}
