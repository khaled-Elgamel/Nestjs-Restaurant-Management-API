/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { User, UserDocument } from './users.schema';
import {
  UserRestaurant,
  UserRestaurantDocument,
} from 'src/users-restaurants/users-restaurants.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(UserRestaurant.name)
    private userRestaurantModel: Model<UserRestaurantDocument>,
  ) {}

  // ✅ Create a new user
  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const user = await this.userModel.create(createUserDto);
    return user;
  }

  // ✅ Get all users
  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().lean();
    return users;
  }

  // ✅ Get a single user
  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).lean();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // ✅ Delete a user
  async delete(id: string): Promise<void> {
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
  }

  /**
   *  Restaurant Recommendations
   * Recommend restaurants for a given user based on favorite cuisines of other users.
   * Steps:
   * 1️⃣ Find the input user's favorite cuisines.
   * 2️⃣ Find other users who share any of these cuisines (excluding the input user).
   * 3️⃣ Aggregate the restaurants that these other users follow.
   * 4️⃣ Return both the list of users and aggregated restaurants.
   */

  async getRestaurantRecommendations(userId: string) {
    // Find the input user's favorite cuisines
    const user = await this.userModel.findById(userId).lean();
    if (!user) throw new NotFoundException('User not found');
    const favoriteCuisines = user.favoriteCuisines;

    // Find other users who share any of the input user's favorite cuisines
    const otherUsers = await this.userModel
      .find({
        _id: { $ne: new Types.ObjectId(userId) },
        favoriteCuisines: { $in: favoriteCuisines },
      })
      .lean();
    const otherUserIds = otherUsers.map((u) => u._id);

    // Aggregate the restaurants that these other users follow

    const restaurantsAgg = await this.userRestaurantModel.aggregate([
      // Filter only the records where user is in the list of similar users
      { $match: { user: { $in: otherUserIds } } },

      {
        // Join with the restaurants collection to get full restaurant details
        $lookup: {
          from: 'restaurants', // MongoDB collection name
          localField: 'restaurant', // field in userRestaurant
          foreignField: '_id', // field in restaurants
          as: 'restaurantDetails', // output array
        },
      },
      // Flatten the array, so each restaurant has its own document
      { $unwind: '$restaurantDetails' },
      {
        // Group all restaurants into a set to remove duplicates
        $group: {
          _id: null,
          restaurants: { $addToSet: '$restaurantDetails' },
        },
      },
    ]);
    const restaurants = restaurantsAgg.length
      ? restaurantsAgg[0].restaurants
      : [];

    // Return both users and restaurants
    return {
      users: otherUsers,
      restaurants,
    };
  }
}
