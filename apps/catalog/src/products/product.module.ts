import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import {
  CreateProductHandler,
  DeleteProductHandler
} from './commands/handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Product as ProductMongo,
  ProductSchema
} from './schemas/product.schema';
import { ProductCreatedHandler } from './events/handlers/product-created.handler';
import { ProductDeleteHandler } from './events/handlers/delete-product.handler';
import { ProductByIdQueryHandler } from './queries/handlers/product-id.handler';

export const CommandHandlers = [CreateProductHandler, DeleteProductHandler];
export const EventHandlers = [ProductCreatedHandler, ProductDeleteHandler];
export const QueryHandlers = [ProductByIdQueryHandler];

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
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class ProductModule {}
