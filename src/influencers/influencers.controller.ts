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
  ValidationPipe,
} from '@nestjs/common';
import { InfluencersService } from './influencers.service';
import { Prisma } from '@prisma/client';
import { GetInfluencersDto } from './dto/get-influencers.dto';

@Controller('influencers')
export class InfluencersController {
  constructor(private readonly influencersService: InfluencersService) {}

  @Post()
  create(@Body(ValidationPipe) influencer: Prisma.InfluencerCreateInput) {}

  @Get()
  findAll(@Query() query: GetInfluencersDto) {
    return this.influencersService.findAll(query)
  }


  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {}

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) influencer: Prisma.InfluencerUpdateInput,
  ) {}

  @Delete(':id') // DELETE /users/:id
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.influencersService.delete(id);
  }
}
