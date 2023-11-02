import { Module } from '@nestjs/common';
import { CatalogCommunicationHelper } from './catalog-communication.helper';
import { RmqModule } from '@app/common/rmq';
import { CATALOG_MICROSERVICE_NAME } from '@app/common/constants';

@Module({
  imports: [
    RmqModule.register({
      name: CATALOG_MICROSERVICE_NAME
    })
  ],
  providers: [CatalogCommunicationHelper],
  exports: [CatalogCommunicationHelper, RmqModule]
})
export class CatalogCommunicationModule {}
