import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ProductService } from './product.service';
import { GET_PRODUCTS_BY_IDs, GET_PRODUCT_BY_ID } from '../common/constants';

@Controller()
export class ProductController {
  constructor(private productService: ProductService) {}

  @EventPattern(GET_PRODUCT_BY_ID)
  async getProduct(@Payload('id') id: number) {
    return await this.productService.findOne(id);
  }

  @EventPattern(GET_PRODUCTS_BY_IDs)
  async getProductsByIds(@Payload('ids') productsID: number[]) {
    console.log('test');
    const t = await this.productService.findManyById(productsID);
    console.log(t);
    return t;
  }
}
