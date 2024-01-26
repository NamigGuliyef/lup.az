import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Notification {
  @Prop({type: [mongoose.Schema.Types.ObjectId],ref: 'notificationCategory'})
  category: Types.ObjectId;
  @Prop({ required: true })
  message: string;
}

export const notificationModel = SchemaFactory.createForClass(Notification);
