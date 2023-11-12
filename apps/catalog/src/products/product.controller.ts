import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ProductService } from './product.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { GET_PRODUCTS_BY_IDs, GET_PRODUCT_BY_ID } from '@app/common/endpoints';
import { HttpExceptionFilter } from '@app/common/filters';
import { LoggerService } from '@app/common/logger/logger.service';

@Controller()
@UseFilters(HttpExceptionFilter)
@UseInterceptors(CacheInterceptor)
export class ProductController {
  constructor(
    private readonly logger: LoggerService,
    private productService: ProductService
  ) {}

  @EventPattern(GET_PRODUCT_BY_ID)
  async getProduct(@Payload('id') id: number) {
    const result = await this.productService.findOne(id);
    this.logger.log('Product retrieved successfully', 'ProductController');
    return result;
  }

  @EventPattern(GET_PRODUCTS_BY_IDs)
  async getProductsByIds(@Payload('ids') productsID: number[]) {
    const result = await this.productService.findManyById(productsID);
    this.logger.log('Products retrieved successfully', 'ProductController');
    return result;
  }
}
