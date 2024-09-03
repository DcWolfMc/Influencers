import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { InfluencersService } from './influencers.service';
import { Prisma } from '@prisma/client';
import { GetInfluencersDto } from './dto/get-influencers.dto';
import { CreateInfluencersDto } from './dto/create-influencers.dto';
import { UpdateInfluencersDto } from './dto/update-influencers.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('influencers')
export class InfluencersController {
  constructor(private readonly influencersService: InfluencersService) {}

  @Post()
  create(@Body(ValidationPipe) influencer: CreateInfluencersDto) {
    return this.influencersService.create(influencer);
  }

  @Get()
  findAll(@Query(ValidationPipe) query: GetInfluencersDto) {
    return this.influencersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.influencersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) influencer: UpdateInfluencersDto,
  ) {
    return this.influencersService.updateOne(id, influencer);
  }

  @Delete(':id') // DELETE /users/:id
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.influencersService.delete(id);
  }
}
