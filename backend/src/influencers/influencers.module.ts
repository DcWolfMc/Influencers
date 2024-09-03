import { Module } from '@nestjs/common';
import { InfluencersController } from './influencers.controller';
import { InfluencersService } from './influencers.service';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [InfluencersController],
  providers: [InfluencersService, JwtAuthGuard],
})
export class InfluencersModule {}
