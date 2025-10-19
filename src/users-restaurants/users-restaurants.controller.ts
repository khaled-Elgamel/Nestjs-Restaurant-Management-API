import { Controller, Post, Delete, Param, Get } from '@nestjs/common';
import { UserRestaurantService } from './users-restaurants.service';
import { ParseMongoIdPipe } from 'src/utils/pipes/parse-mongo-id.pipe';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('')
export class UserRestaurantController {
  constructor(private readonly userRestaurantService: UserRestaurantService) {}

  @Post('users/:userId/follow/:restaurantId')
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

  @Delete('users/:userId/unfollow/:restaurantId')
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
  @Get('users/:userId/following')
  getFollowing(@Param('userId', ParseMongoIdPipe) userId: string) {
    return this.userRestaurantService.getFollowingRestaurants(userId);
  }
}
