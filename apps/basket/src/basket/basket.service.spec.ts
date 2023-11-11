import { Test, TestingModule } from '@nestjs/testing';
import { BasketService } from './basket.service';
import { Basket } from './entities/basket.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BasketService', () => {
  let service: BasketService;
  let repo: Repository<Basket>;

  const mockBasket: Basket = {
    userID: 1,
    productIDs: [1, 2, 3]
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BasketService,
        {
          provide: getRepositoryToken(Basket),
          useClass: Repository
        }
      ]
    }).compile();

    service = module.get<BasketService>(BasketService);
    repo = module.get<Repository<Basket>>(getRepositoryToken(Basket));
  });

  describe('getBasketById', () => {
    it('should find and return basket by userID', async () => {
      jest.spyOn(repo, 'findOneBy').mockResolvedValue(mockBasket);
      const result = service.getProductsFromBasketByUserID(1);

      expect(repo.findOneBy).toHaveBeenCalledWith(mockBasket.userID);
      expect(result).toEqual(mockBasket.productIDs);
    });
  });
});
