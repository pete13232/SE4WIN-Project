import { Test, TestingModule } from '@nestjs/testing';
import { DefaultResolver } from './default.resolver';
import { DefaultService } from './default.service';

describe('DefaultResolver', () => {
  let resolver: DefaultResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultResolver, DefaultService],
    }).compile();

    resolver = module.get<DefaultResolver>(DefaultResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
