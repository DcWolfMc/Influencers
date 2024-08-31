import { Module } from '@nestjs/common';
import { InfluencersController } from './influencers.controller';
import { InfluencersService } from './influencers.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [DatabaseModule, InfluencersController],
  providers: [InfluencersService]
})
export class InfluencersModule {}
