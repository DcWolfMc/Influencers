import {
  IsOptional,
  IsString,
  IsInt,
  Min,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsEmail,
  IsUrl,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateInfluencersDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  instagram_name: string;

  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => (!value && 0) || value)
  followers: number;

  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => (!value && 0) || value)
  following: number;

  @IsDefined()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  image?: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? value.split(',') : value))
  categories?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? value.split(',') : value))
  brands?: string[];
}
