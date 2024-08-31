import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { GetInfluencersDto } from './dto/get-influencers.dto';
import { number } from 'zod';
import { CreateInfluencersDto } from './dto/create-influencers.dto';
import { UpdateInfluencersDto } from './dto/update-influencers.dto';

@Injectable()
export class InfluencersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(
    influencerDto: CreateInfluencersDto & {
      categories: string[];
      brands: string[];
    },
  ) {
    const { categories, brands, ...influencerData } = influencerDto;

    return this.databaseService.$transaction(async (prisma) => {
      // Conectar ou criar categorias
      const categoryConnections = categories.map((categoryName) => ({
        where: { name: categoryName },
        create: { name: categoryName },
      }));

      // Conectar ou criar marcas
      const brandConnections = brands.map((brandName) => ({
        where: { name: brandName },
        create: { name: brandName, description: '', niche: '' },
      }));

      return prisma.influencer.create({
        data: {
          ...influencerData,
          categories: { connectOrCreate: categoryConnections },
          brands: { connectOrCreate: brandConnections },
          image: influencerData.image ?? '',
        },
      });
    });
  }

  async findOne(id: number) {
    return await this.databaseService.influencer.findFirst({
      where: { id },
      include: { categories: true, brands: true },
    });
  }

  async findAll(query: GetInfluencersDto) {
    const { categories, brands, page = 1, pageSize = 10 } = query;

    return await this.databaseService.influencer.findMany({
      where: {
        ...(categories?.length > 0 && {
          categories: {
            some: {
              name: { in: categories },
            },
          },
        }),
        ...(brands?.length > 0 && {
          brands: {
            some: {
              name: { in: brands },
            },
          },
        }),
      },
      include: { categories: true, brands: true },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }
  async updateOne(
    id: number,
    influencer: UpdateInfluencersDto & {
      categories: string[];
      brands: string[];
    },
  ) {
    const { categories, brands, ...rest } = influencer;

    return await this.databaseService.$transaction(async (prisma) => {
      // Conectar ou criar categorias
      const categoryConnections = categories.map((categoryName) => ({
        where: { name: categoryName },
        create: { name: categoryName },
      }));

      // Conectar ou criar marcas
      const brandConnections = brands.map((brandName) => ({
        where: { name: brandName },
        create: { name: brandName, description: '', niche: '' },
      }));
      // Atualizando o influenciador com os outros campos
      const updatedInfluencer = await prisma.influencer.update({
        where: { id },
        data: {
          categories: { connectOrCreate: categoryConnections },
          brands: { connectOrCreate: brandConnections },
          ...rest,
        },
        include: { categories: true, brands: true },
      });

      return updatedInfluencer;
    });
  }

  async delete(id: number) {
    return this.databaseService.influencer.delete({ where: { id } });
  }
}
