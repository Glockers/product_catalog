import { Module } from '@nestjs/common';
import { BasketCommunicationHelper } from './basket-communication.helper';
import { RmqModule } from '@app/common/rmq';
import { BASKET_MICROSERVICE_NAME } from '@app/common/constants';

@Module({
  imports: [
    RmqModule.register({
      name: BASKET_MICROSERVICE_NAME
    })
  ],
  providers: [BasketCommunicationHelper],
  exports: [BasketCommunicationHelper, RmqModule]
})
export class BasketCommunicationModule {}
