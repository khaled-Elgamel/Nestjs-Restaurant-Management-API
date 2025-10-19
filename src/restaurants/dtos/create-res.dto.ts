import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateRestaurantDto {
  @ApiProperty({ example: 'مطعم التحرير', description: 'إسم المطعم' })
  @IsString()
  @IsNotEmpty()
  name_ar: string;

  @ApiProperty({ example: 'Tahrir', description: 'Restaurant Name' })
  @IsString()
  @IsNotEmpty()
  name_en: string;

  @ApiProperty({ example: 'tahrir', description: 'Slug' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({
    example: ['Italian', 'Seafood', 'Fried'],
    description: 'Cuisine types',
  })
  @IsString({ each: true, message: 'each cuisine must be a string' })
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  cuisines: string[];

  @ApiProperty({
    example: {
      type: 'Point',
      coordinates: [31.205, 30.048],
    },
    description: 'Location',
  })
  @IsNotEmpty()
  location: {
    type: string;
    coordinates: number[];
  };
}
