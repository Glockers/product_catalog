import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import {
  CreateProductHandler,
  DeleteProductHandler,
  UpdateProductHandler
} from './commands/handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Product as ProductMongo,
  ProductSchema
} from './schemas/product.schema';
import { ProductCreatedHandler, ProductDeleteHandler } from './events/handlers';
import {
  ProductsQueryHandler,
  ProductByIdQueryHandler
} from './queries/handlers';
import { ProductUpdatedHandler } from './events/handlers/update-product.handler';

export const CommandHandlers = [
  CreateProductHandler,
  DeleteProductHandler,
  UpdateProductHandler
];
export const EventHandlers = [
  ProductCreatedHandler,
  ProductDeleteHandler,
  ProductUpdatedHandler
];
export const QueryHandlers = [ProductByIdQueryHandler, ProductsQueryHandler];

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
