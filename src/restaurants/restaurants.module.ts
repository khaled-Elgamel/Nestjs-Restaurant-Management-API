import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Restaurant, RestaurantSchema } from './restaurants.schema';
import { UsersRestaurantsModule } from 'src/users-restaurants/users-restaurants.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Restaurant.name, schema: RestaurantSchema },
    ]),
    UsersRestaurantsModule,
  ],

  providers: [RestaurantsService],
  controllers: [RestaurantsController],
})
export class RestaurantsModule {}
