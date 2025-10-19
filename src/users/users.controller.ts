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

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
}
