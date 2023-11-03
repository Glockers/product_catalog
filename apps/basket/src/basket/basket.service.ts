import { Injectable } from '@nestjs/common';
import { IProduct } from './types';
import { InjectRepository } from '@nestjs/typeorm';
import { Basket } from './entities/basket.entity';
import { Repository } from 'typeorm';
import { CatalogCommunicationHelper } from '@app/common/microservice';
import { GET_PRODUCTS_BY_IDs, GET_PRODUCT_BY_ID } from '../common/constants';

@Injectable()
export class BasketService {
  constructor(
    private catalogClient: CatalogCommunicationHelper,
    @InjectRepository(Basket)
    private basketRepository: Repository<Basket>
  ) {}

  async add(userID: number, productID: number): Promise<IProduct> {
    const productInfo = await this.getProduct(productID);

    if (!productInfo) throw new Error('Product not found');

    const userBasket = await this.getBasketById(userID);
    if (!userBasket)
      this.basketRepository.save({
        userID,
        productIDs: [productID]
      });

    if (userBasket.productIDs.includes(productID))
      throw new Error('this product is already add');

    this.basketRepository.update(
      {
        userID
      },
      { productIDs: [...userBasket.productIDs, productID] }
    );

    return productInfo;
  }

  async getBasketById(userID: number): Promise<Basket> | null {
    return await this.basketRepository.findOneBy({
      userID
    });
  }

  async getProductsFromBasketByUserID(userID: number) {
    const basket = await this.getBasketById(userID);

    if (!basket) return [];
    return basket.productIDs;
  }

  async removeProduct(userID: number, productID: number) {
    const productInfo = await this.getProduct(productID);

    if (!productInfo) throw new Error('Product not found');

    const userBasket = await this.getBasketById(userID);

    if (!userBasket) throw new Error('Basket not found');
    if (!userBasket.productIDs.includes(productID))
      throw new Error('Product not found in basket');

    this.basketRepository.update(
      {
        userID
      },
      {
        productIDs: userBasket.productIDs.filter((id) => id !== productID)
      }
    );

    return productInfo;
  }

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
