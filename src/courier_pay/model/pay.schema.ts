import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: true })
export class CourierPay {
  @Prop({ required: true })
  bankCardNumber: string;
  @Prop({ required: true })
  amount_paid: number;
  @Prop({ required: true })
  status: string;
  @Prop({ required: true })
  username: string;
}

export const courierPayModel = SchemaFactory.createForClass(CourierPay);