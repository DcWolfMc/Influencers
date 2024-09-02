import { Module } from '@nestjs/common';
import { InfluencersController } from './influencers.controller';
import { InfluencersService } from './influencers.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [InfluencersController],
  providers: [InfluencersService],
})
export class InfluencersModule {}
