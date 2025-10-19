import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoModule } from './mongo/mongo.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { UsersModule } from './users/users.module';
import { UsersRestaurantsModule } from './users-restaurants/users-restaurants.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongoModule,
    RestaurantsModule,
    UsersModule,
    UsersRestaurantsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
