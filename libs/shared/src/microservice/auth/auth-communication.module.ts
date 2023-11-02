import { Module } from '@nestjs/common';
import { AuthCommunicationHelper } from './auth-communication.helper';
import { RmqModule } from '@app/common/rmq';
import { AUTH_MICROSERVICE_NAME } from '@app/common/constants';

@Module({
  imports: [
    RmqModule.register({
      name: AUTH_MICROSERVICE_NAME
    })
  ],
  providers: [AuthCommunicationHelper],
  exports: [AuthCommunicationHelper, RmqModule]
})
export class AuthCommunicationModule {}
