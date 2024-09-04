import { IsOptional, IsString, IsInt, Min, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetInfluencersDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => 
    typeof value === 'string' ? value.split(/,|%2C/).map(name => name.trim()) : [], 
    { toClassOnly: true }
  )
  categories?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => 
    typeof value === 'string' ? value.split(/,|%2C/).map(name => name.trim()) : [], 
    { toClassOnly: true }
  )
  brands?: string[];

  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) =>
    Number.isInteger(Number(value)) ? Number(value) : 1,
  )
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) =>
    Number.isInteger(Number(value)) ? Number(value) : 1,
  )
  pageSize?: number = 10;
}
