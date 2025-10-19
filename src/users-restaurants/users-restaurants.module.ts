import { Module } from '@nestjs/common';
import { UserRestaurantService } from './users-restaurants.service';
import { UserRestaurantController } from './users-restaurants.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserRestaurantSchema,
  UserRestaurant,
} from './users-restaurants.schema';
import { User, UserSchema } from 'src/users/users.schema';
import {
  Restaurant,
  RestaurantSchema,
} from 'src/restaurants/restaurants.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserRestaurant.name, schema: UserRestaurantSchema },
      { name: User.name, schema: UserSchema },
      { name: Restaurant.name, schema: RestaurantSchema },
    ]),
  ],
  providers: [UserRestaurantService],
  controllers: [UserRestaurantController],
  exports: [UserRestaurantService],
})
export class UsersRestaurantsModule {}
