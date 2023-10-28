import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private productService: ProductService) {}

  @EventPattern('product/getProductById')
  async getProduct(@Payload('id') id: number) {
    return await this.productService.findOne(id);
  }
}
