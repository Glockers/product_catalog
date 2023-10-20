import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProductCreatedEvent } from '../impl/product-created.event';

@EventsHandler(ProductCreatedEvent)
export class ProductCreatedHandler
  implements IEventHandler<ProductCreatedEvent>
{
  handle(event: ProductCreatedEvent) {
    console.log('save in database', event.product);
  }
}
