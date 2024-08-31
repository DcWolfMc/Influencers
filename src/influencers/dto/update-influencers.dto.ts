import { CreateInfluencersDto } from './create-influencers.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateInfluencersDto extends PartialType(CreateInfluencersDto) {}