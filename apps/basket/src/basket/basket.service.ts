import { Injectable } from '@nestjs/common';
import { IProduct } from './types';
import { InjectRepository } from '@nestjs/typeorm';
import { Basket } from './entities/basket.entity';
import { Repository } from 'typeorm';
import { CatalogService } from '../services/product.service';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Basket)
    private basketRepository: Repository<Basket>,
    private readonly catalogService: CatalogService
  ) {}

  async add(userID: number, productID: number): Promise<IProduct> {
    const productInfo = await this.catalogService.getProduct(productID);

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

  async clearBasket(userID: number) {
    return await this.basketRepository.delete(userID);
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
    const productInfo = await this.catalogService.getProduct(productID);

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
}
