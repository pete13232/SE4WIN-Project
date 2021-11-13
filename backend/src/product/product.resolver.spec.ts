import { Test, TestingModule } from '@nestjs/testing';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

const testCat1 = 'Test Cat 1';
const testCat3 = 'Test Cat 3';

describe('ProductResolver', () => {
  let resolver: ProductResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductResolver,
        {
          /**
           * Mock the CatService to return values we are expecting.
           *
           * This may not seem like a big deal with such a simple application
           * especially as everything is done in memory, but this becomes even
           * more important as services depend on other services such as TypeORM/Mongo
           * ElasticSearch, etc.
           */
          provide: ProductService,
          useValue: {
            findAll: jest.fn().mockReturnValue([
              {
                name: 'test product',
                price: 15,
              },
            ]),
          },
        },
      ],
    }).compile();

    resolver = module.get<ProductResolver>(ProductResolver);
  });

  /**
   * These all may seem like simple tests that don't do much, but in reality
   * the controller itself is pretty simple. Call a service and return it's value,
   * the complicated stuff comes in either in the service, a pipe, or the interceptor
   */
  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  describe('getAllCats', () => {
    it('should get the list of product', () => {
      const resolverProd = resolver.findAll();
      console.log(resolverProd);
      expect(typeof resolverProd).toBe('object');
    });
  });
});
