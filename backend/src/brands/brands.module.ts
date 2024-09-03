import { Module } from '@nestjs/common';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [BrandsController],
  providers: [BrandsService, JwtAuthGuard],
})
export class BrandsModule {}
