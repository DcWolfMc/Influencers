import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetInfluencersDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.split(',').map((name: string) => name.trim()))
  categories?: string[];

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.split(',').map((name: string) => name.trim()))
  brands?: string[];

  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => Number.isInteger(Number(value)) ? Number(value) : 1)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => Number.isInteger(Number(value)) ? Number(value) : 1)
  pageSize?: number = 10;
}
