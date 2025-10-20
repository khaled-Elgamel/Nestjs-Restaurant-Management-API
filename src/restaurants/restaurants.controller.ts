import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dtos/create-res.dto';
import { Restaurant } from './restaurants.schema';

import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserRestaurantService } from 'src/users-restaurants/users-restaurants.service';
import { ParseMongoIdPipe } from 'src/utils/pipes/parse-mongo-id.pipe';

@ApiTags('Restaurants')
@Controller('restaurants')
export class RestaurantsController {
  constructor(
    private readonly restaurantsService: RestaurantsService,
    private readonly userRestaurantService: UserRestaurantService,
  ) {}

  @ApiOperation({ summary: 'Create a new restaurant' })
  @ApiResponse({ status: 201, description: 'Restaurant created successfully' })
  @ApiBody({ type: CreateRestaurantDto })
  @Post()
  async create(
    @Body() createRestaurantDto: CreateRestaurantDto,
  ): Promise<Restaurant> {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @ApiOperation({ summary: 'Get all restaurants or filter by cuisine' })
  @ApiResponse({ status: 200, description: 'Restaurants found' })
  @ApiQuery({
    name: 'cuisine',
    required: false,
    description: 'Cuisine type to filter by',
    example: 'Italian',
  })
  @Get()
  async findAll(@Query('cuisine') cuisine?: string): Promise<Restaurant[]> {
    return this.restaurantsService.findAll(cuisine);
  }

  @ApiOperation({
    summary: 'Find restaurants within a given radius from a point',
  })
  @ApiResponse({ status: 200, description: 'Restaurants found' })
  @ApiParam({
    name: 'latitude',
    required: true,
    description: 'Latitude of the reference point',
    example: 30.048,
  })
  @ApiParam({
    name: 'longitude',
    required: true,
    description: 'Longitude of the reference point',
    example: 31.205,
  })
  @ApiQuery({
    name: 'radiusInMeters',
    required: false,
    description: 'Maximum distance in meters',
    example: 1000,
  })
  @Get('nearby')
  async findNearby(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('radiusInMeters') radiusInMeters = 1000,
  ): Promise<Restaurant[]> {
    return this.restaurantsService.findNearby(
      latitude,
      longitude,
      radiusInMeters,
    );
  }

  @ApiOperation({ summary: 'Get a single restaurant by id or slug' })
  @ApiResponse({ status: 200, description: 'Restaurant found' })
  @ApiParam({
    name: 'idOrSlug',
    required: true,
    description: 'ID or slug of the restaurant',
    examples: {
      id: { value: '64f4b9d3d8b8b8b8b8b8b8b8', description: 'ID' },
      slug: { value: 'tahrir', description: 'Slug' },
    },
  })
  @Get(':idOrSlug')
  async findOne(@Param('idOrSlug') idOrSlug: string): Promise<Restaurant> {
    return this.restaurantsService.findOne(idOrSlug);
  }

  @ApiOperation({ summary: 'Get all users following a particular restaurant' })
  @ApiResponse({ status: 200, description: 'Users following the restaurant' })
  @ApiParam({
    name: 'restaurantId',
    required: true,
    description: 'ID of the restaurant',
    example: '64f4b9d3d8b8b8b8b8b8b8b8',
  })
  @Get(':restaurantId/followers')
  getFollowers(@Param('restaurantId', ParseMongoIdPipe) restaurantId: string) {
    return this.userRestaurantService.getRestaurantFollowers(restaurantId);
  }
}
