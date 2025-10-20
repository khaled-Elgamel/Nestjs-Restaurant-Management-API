import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './users.schema';
import { ParseMongoIdPipe } from 'src/utils/pipes/parse-mongo-id.pipe';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserRestaurantService } from 'src/users-restaurants/users-restaurants.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userRestaurantService: UserRestaurantService,
  ) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiBody({ type: CreateUserDto })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get a single user' })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'User ID',
    example: '68f44790b21fbd1e686de92e',
  })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  @Get(':id')
  async findOne(@Param('id', ParseMongoIdPipe) id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'User ID',
    example: '68f44790b21fbd1e686de92e',
  })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @Delete(':id')
  async delete(@Param('id', ParseMongoIdPipe) id: string): Promise<void> {
    return this.usersService.delete(id);
  }

  @ApiOperation({ summary: 'Get recommendations for a user' })
  @ApiParam({
    name: 'userId',
    type: 'string',
    required: true,
    description: 'User ID',
    example: '68f44790b21fbd1e686de92e',
  })
  @ApiResponse({
    status: 200,
    description: 'Recommendations retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get(':userId/recommendations')
  async getRecommendations(@Param('userId', ParseMongoIdPipe) userId: string) {
    return this.usersService.getRestaurantRecommendations(userId);
  }

  @Post(':userId/follow/:restaurantId')
  @ApiOperation({ summary: 'Follow a restaurant' })
  @ApiParam({
    name: 'userId',
    description: 'User ID',
    required: true,
    example: '5f9e8f9e8f9e8f9e8f9e8f9e',
  })
  @ApiParam({
    name: 'restaurantId',
    description: 'Restaurant ID',
    required: true,
    example: '5f9e8f9e8f9e8f9e8f9e8f9e',
  })
  @ApiResponse({
    status: 201,
    description: 'User followed the restaurant successfully.',
  })
  @ApiResponse({ status: 409, description: 'Already followed' })
  follow(
    @Param('userId') userId: string,
    @Param('restaurantId') restaurantId: string,
  ) {
    return this.userRestaurantService.follow(userId, restaurantId);
  }

  @Delete(':userId/unfollow/:restaurantId')
  @ApiOperation({ summary: 'Unfollow a restaurant' })
  @ApiParam({
    name: 'user Id',
    description: 'User ID',
    required: true,
    example: '5f9e8f9e8f9e8f9e8f9e8f9e',
  })
  @ApiParam({
    name: 'restaurant Id',
    description: 'Restaurant ID',
    required: true,
    example: '5f9e8f9e8f9e8f9e8f9e8f9e',
  })
  @ApiResponse({
    status: 200,
    description: 'User unfollowed the restaurant successfully.',
  })
  @ApiResponse({ status: 404, description: 'Follow relation not found' })
  unfollow(
    @Param('userId') userId: string,
    @Param('restaurantId') restaurantId: string,
  ) {
    return this.userRestaurantService.unfollow(userId, restaurantId);
  }

  @ApiOperation({ summary: 'Get all restaurants that a user is following' })
  @ApiParam({
    name: 'userId',
    description: 'User ID',
    required: true,
    example: '5f9e8f9e8f9e8f9e8f9e8f9e',
  })
  @ApiResponse({
    status: 200,
    description: 'List of following restaurants',
  })
  @Get(':userId/following')
  getFollowing(@Param('userId', ParseMongoIdPipe) userId: string) {
    return this.userRestaurantService.getFollowingRestaurants(userId);
  }
}
