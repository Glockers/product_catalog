import { Injectable } from '@nestjs/common';
import { IProduct } from '../basket/types';
import { CatalogCommunicationHelper } from '@app/common/microservice';
import { GET_PRODUCTS_BY_IDs, GET_PRODUCT_BY_ID } from '@app/common/endpoints';

@Injectable()
export class CatalogService {
  constructor(private catalogClient: CatalogCommunicationHelper) {}

  async getProduct(productID: number): Promise<IProduct> | null {
    return await this.catalogClient.sentToMicroservice<IProduct>(
      GET_PRODUCT_BY_ID,
      {
        id: productID
      }
    );
  }

  async getProducts(productsID: number[]) {
    return await this.catalogClient.sentToMicroservice(GET_PRODUCTS_BY_IDs, {
      ids: productsID
    });
  }
}
