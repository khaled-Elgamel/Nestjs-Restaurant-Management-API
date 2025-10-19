import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ required: true, unique: true })
  fullName: string;

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
    default: [],
  })
  favoriteCuisines: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = HydratedDocument<User>;
