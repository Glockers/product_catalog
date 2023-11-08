import { CatalogCommunicationHelper } from '@app/common/microservice';
import { Injectable } from '@nestjs/common';
import { Product } from '../types/product.type';
import { GET_PRODUCTS_BY_IDs } from '@app/common/endpoints';

@Injectable()
export class CatalogService {
  constructor(private readonly catalogClient: CatalogCommunicationHelper) {}

  async getProducts(productsID: number[]): Promise<Product[]> {
    return await this.catalogClient.sentToMicroservice<Product[]>(
      GET_PRODUCTS_BY_IDs,
      {
        ids: productsID
      }
    );
  }
}
