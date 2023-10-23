import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CreateProductHandler } from './commands/handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Product as ProductMongo,
  ProductSchema
} from './schemas/product.schema';
import { ProductCreatedHandler } from './events/handlers/product-created.handler';

export const CommandHandlers = [CreateProductHandler];
export const EventHandlers = [ProductCreatedHandler];

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    CqrsModule,
    MongooseModule.forFeature([
      { name: ProductMongo.name, schema: ProductSchema }
    ])
  ],
  providers: [
    ProductResolver,
    ProductService,
    ...CommandHandlers,
    ...EventHandlers
  ]
})
export class ProductModule {}
