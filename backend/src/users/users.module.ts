import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [UsersController],
  providers: [UsersService,JwtAuthGuard],
})
export class UsersModule {}
