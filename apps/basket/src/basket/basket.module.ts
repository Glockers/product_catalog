import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketResolver } from './basket.resolver';
import { RmqModule } from '@app/common/rmq';
import { CATALOG } from '@app/common/constants';

@Module({
  imports: [
    RmqModule.register({
      name: CATALOG
    })
  ],
  providers: [BasketResolver, BasketService]
})
export class BasketModule {}
