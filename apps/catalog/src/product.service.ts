import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  create(createCatalogInput: CreateProductInput) {
    this.productRepository.save(createCatalogInput);
    return createCatalogInput;
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    return await this.productRepository.findOneBy({
      id: id
    });
  }

  async remove(id: number) {
    const selectedProduct = await this.findOne(id);
    return await this.productRepository.delete(selectedProduct);
  }
}
