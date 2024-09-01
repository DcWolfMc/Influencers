import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string = '';

  @IsString()
  @IsOptional()
  niche: string = '';
}
