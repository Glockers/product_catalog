import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CreateProductHandler } from './commands/handlers';
import { CqrsModule } from '@nestjs/cqrs';

export const CommandHandlers = [CreateProductHandler];
export const EventHandlers = [];

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CqrsModule],
  providers: [ProductResolver, ProductService, ...CommandHandlers]
})
export class ProductModule {}
