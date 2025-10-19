import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Restaurant {
  @Prop({ required: true })
  name_en: string;

  @Prop({ required: true })
  name_ar: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({
    type: [String],
    enum: [
      'Asian',
      'Burgers',
      'Fried',
      'Italian',
      'Egyptian',
      'Mexican',
      'Seafood',
    ],
    required: true,
  })
  cuisines: string[];

  @Prop({
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true },
  })
  location: { type: string; coordinates: number[] };
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
RestaurantSchema.index({ location: '2dsphere' });

export type RestaurantDocument = HydratedDocument<Restaurant>;
