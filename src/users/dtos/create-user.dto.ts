import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'Full Name' })
  @IsString()
  @IsNotEmpty()
  @Length(8, 50, { message: 'fullName must be between 8 and 50 characters' })
  fullName: string;

  @ApiProperty({
    example: ['Italian', 'Seafood', 'Fried'],
    description: 'Favorite Cuisines',
    required: false,
  })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  favoriteCuisines: string[];
}
