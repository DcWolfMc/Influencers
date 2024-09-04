import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';


@Injectable()
export class BrandsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createBrandDto: CreateBrandDto) {
    return await this.databaseService.brand.create({
      data: createBrandDto,
    });
  }

  async findAll() {
    return await this.databaseService.brand.findMany();
  }

  async findOne(id: number) {
    return await this.databaseService.brand.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    updateBrandDto: UpdateBrandDto,
  ) {
    try {
      return await this.databaseService.brand.update({
        where: { id },
        data: updateBrandDto,
      });
    } catch (error) {
      return null; // Retorna null se a marca não for encontrada
    }
  }

  async remove(id: number) {
    try {
      return await this.databaseService.brand.delete({
        where: { id },
      });
    } catch (error) {
      return null; // Retorna null se a marca não for encontrada
    }
  }
}
