import { Test, TestingModule } from '@nestjs/testing';
import { InfluencersController } from './influencers.controller';
import { InfluencersService } from './influencers.service';

describe('InfluencersController', () => {
  let controller: InfluencersController;
  let service: InfluencersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InfluencersController],
      providers: [
        {
          provide: InfluencersService,
          useValue: {
            // Mock implementations of methods if necessary
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            remove: jest.fn().mockResolvedValue({})
          },
        },
      ],
    }).compile();

    controller = module.get<InfluencersController>(InfluencersController);
    service = module.get<InfluencersService>(InfluencersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
