import { Test, TestingModule } from '@nestjs/testing';
import { BrandsService } from './brands.service';
import { DatabaseService } from '../database/database.service'; // ajuste o caminho conforme necessário

describe('BrandsService', () => {
  let service: BrandsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrandsService,
        {
          provide: DatabaseService,
          useValue: {
            // Mock implementations of methods if necessary
            // Ex: findBrand: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<BrandsService>(BrandsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
