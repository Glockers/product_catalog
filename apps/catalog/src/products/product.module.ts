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
import { ProductSchema } from './entities/product.schema';
import {
  ProductCreatedHandler,
  ProductDeleteHandler,
  ProductUpdatedHandler
} from './events/handlers';
import {
  ProductsQueryHandler,
  ProductByIdQueryHandler,
  ProductsByIdsQueryHandler
} from './queries/handlers';
import { ProductController } from './product.controller';
import { CacheModule } from '@nestjs/cache-manager';

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
export const QueryHandlers = [
  ProductByIdQueryHandler,
  ProductsQueryHandler,
  ProductsByIdsQueryHandler
];

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    CqrsModule,
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    CacheModule.register()
  ],
  providers: [
    ProductResolver,
    ProductService,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ],
  controllers: [ProductController]
})
export class ProductModule {}
