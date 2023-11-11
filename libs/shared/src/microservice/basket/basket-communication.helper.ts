import { BASKET_MICROSERVICE_NAME } from '@app/common/constants';
import { MicroserviceCommunication } from '@app/common/microservice/microservice-communication.abstact';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class BasketCommunicationHelper extends MicroserviceCommunication {
  constructor(@Inject(BASKET_MICROSERVICE_NAME) productClient: ClientProxy) {
    super(productClient);
  }
}
