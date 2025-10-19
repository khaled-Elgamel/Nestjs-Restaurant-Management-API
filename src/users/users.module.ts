import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {
  UserRestaurant,
  UserRestaurantSchema,
} from 'src/users-restaurants/users-restaurants.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserRestaurant.name, schema: UserRestaurantSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
