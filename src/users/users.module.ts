import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRestaurantsModule } from 'src/users-restaurants/users-restaurants.module';
import {
  UserRestaurant,
  UserRestaurantSchema,
} from 'src/users-restaurants/users-restaurants.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserRestaurant.name, schema: UserRestaurantSchema },
    ]),
    UsersRestaurantsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
