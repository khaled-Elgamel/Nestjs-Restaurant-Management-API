import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  UserRestaurant,
  UserRestaurantDocument,
} from './users-restaurants.schema';

@Injectable()
export class UserRestaurantService {
  constructor(
    @InjectModel(UserRestaurant.name)
    private userRestaurantModel: Model<UserRestaurantDocument>,
  ) {}

  /**
   * Follow a restaurant
   * Steps:
   * 1️⃣ Attempt to create a new follow record linking user and restaurant
   * 2️⃣ If a duplicate exists (unique index violation), throw ConflictException
   * 3️⃣ Otherwise, return the newly created follow document
   */
  async follow(userId: string, restaurantId: string): Promise<UserRestaurant> {
    try {
      const follow = await this.userRestaurantModel.create({
        user: new Types.ObjectId(userId),
        restaurant: new Types.ObjectId(restaurantId),
      });
      return follow;
      // Duplicate key error → user already follows this restaurant
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictException('Already followed');
      }
      throw err;
    }
  }

  /**
   * Unfollow a restaurant
   * Steps:
   * 1️⃣ Find the follow relationship between user and restaurant
   * 2️⃣ If not found → throw NotFoundException
   * 3️⃣ If found → delete the record
   */
  async unfollow(userId: string, restaurantId: string): Promise<void> {
    const result = await this.userRestaurantModel.findOneAndDelete({
      user: new Types.ObjectId(userId),
      restaurant: new Types.ObjectId(restaurantId),
    });
    if (!result) throw new NotFoundException('Follow relation not found');
  }

  /**
   * Get all restaurants that a user is following
   * Steps:
   * 1️⃣ Find all userRestaurant documents with the given userId
   * 2️⃣ Populate the 'restaurant' field with restaurant details (name_en, name_ar, slug)
   * 3️⃣ Return the list of populated documents
   */
  async getFollowingRestaurants(userId: string) {
    return this.userRestaurantModel
      .find({ user: new Types.ObjectId(userId) })
      .populate({
        path: 'restaurant',
        select: 'name_en name_ar slug',
      });
  }

  /**
   * Get all users following a particular restaurant
   * Steps:
   * 1️⃣ Find all userRestaurant documents with the given restaurantId
   * 2️⃣ Populate the 'user' field with user details (fullName)
   * 3️⃣ Return the list of populated documents
   */
  async getRestaurantFollowers(restaurantId: string) {
    console.log('getRestaurantFollowers');
    return this.userRestaurantModel
      .find({ restaurant: new Types.ObjectId(restaurantId) })
      .populate({
        path: 'user',
        select: 'fullName',
      });
  }
}
