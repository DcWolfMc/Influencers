import { Test, TestingModule } from '@nestjs/testing';
import { InfluencersService } from './influencers.service';
import { DatabaseService } from 'src/database/database.service';

describe('InfluencersService', () => {
  let service: InfluencersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InfluencersService,
        {
          provide: DatabaseService,
          useValue: {
            // Mock do DatabaseService aqui
          },
        },
      ],
    }).compile();

    service = module.get<InfluencersService>(InfluencersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
