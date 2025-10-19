import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class UserRestaurant {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Restaurant', required: true })
  restaurant: Types.ObjectId;
}

export const UserRestaurantSchema =
  SchemaFactory.createForClass(UserRestaurant);

UserRestaurantSchema.index({ user: 1, restaurant: 1 }, { unique: true });

export type UserRestaurantDocument = HydratedDocument<UserRestaurant>;
