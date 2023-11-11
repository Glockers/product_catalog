import { Controller, UseInterceptors } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ProductService } from './product.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { GET_PRODUCTS_BY_IDs, GET_PRODUCT_BY_ID } from '@app/common/endpoints';

@Controller()
@UseInterceptors(CacheInterceptor)
export class ProductController {
  constructor(private productService: ProductService) {}

  @EventPattern(GET_PRODUCT_BY_ID)
  async getProduct(@Payload('id') id: number) {
    return await this.productService.findOne(id);
  }

  @EventPattern(GET_PRODUCTS_BY_IDs)
  async getProductsByIds(@Payload('ids') productsID: number[]) {
    return await this.productService.findManyById(productsID);
  }
}
