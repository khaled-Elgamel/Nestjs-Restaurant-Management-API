import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Restaurant, RestaurantDocument } from './restaurants.schema';
import { CreateRestaurantDto } from './dtos/create-res.dto';
@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: Model<RestaurantDocument>,
  ) {}

  //✅ create a new restaurant
  async create(
    createRestaurantDto: CreateRestaurantDto,
  ): Promise<RestaurantDocument> {
    const restaurant = await this.restaurantModel.create(createRestaurantDto);
    return restaurant;
  }

  //✅ get all restaurants or filter by cuisine
  async findAll(cuisine?: string): Promise<Restaurant[]> {
    const filter = cuisine
      ? { cuisines: { $regex: new RegExp(`^${cuisine}$`, 'i') } }
      : {};
    const restaurants = await this.restaurantModel.find(filter).lean();
    return restaurants;
  }

  //✅ get a single restaurant by id or slug
  async findOne(idOrSlug: string): Promise<Restaurant> {
    const query = isValidObjectId(idOrSlug)
      ? { _id: idOrSlug }
      : { slug: idOrSlug };

    const restaurant = await this.restaurantModel.findOne(query).lean();
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }
    return restaurant;
  }

  /**
   * Find restaurants within a given radius from a point (longitude, latitude)
   * Using MongoDB geospatial query:
   * $near       → Sorts documents by distance from the point
   * $geometry   → Defines the reference point (type: 'Point', coordinates: [lng, lat])
   * $maxDistance → Maximum distance in meters
   */
  async findNearby(
    latitude: number,
    longitude: number,
    radiusInMeters = 1000,
  ): Promise<Restaurant[]> {
    if (!latitude || !longitude) {
      throw new BadRequestException('Latitude and longitude are required');
    }
    const restaurants = await this.restaurantModel
      .find({
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude], // input from query params
            },
            $maxDistance: radiusInMeters,
          },
        },
      })
      .lean();

    return restaurants;
  }
}
