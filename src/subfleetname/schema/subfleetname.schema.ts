import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class subFleetName {
  @Prop({ required: true })
  name: string;
  @Prop({ ref: 'user', required: true })
  courierIds: [mongoose.Schema.Types.ObjectId];
}

export const subFleetNameModel = SchemaFactory.createForClass(subFleetName);
