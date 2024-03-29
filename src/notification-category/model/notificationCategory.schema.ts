import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: true })
export class NotificationCategory {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  type: string;
}

export const NotificationCategoryModel =
  SchemaFactory.createForClass(NotificationCategory);
