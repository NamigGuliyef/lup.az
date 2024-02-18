import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: true })
export class CourierPay {
  @Prop({ required: true })
  bankCardNumber: string;
  @Prop({ required: true })
  total_earning:string
  @Prop({ required: true })
  debt: string;
  @Prop({ required: true })
  amount_paid: string;
  @Prop({ required: true })
  status: string;
  @Prop({ required: true })
  username: string;
}

export const courierPayModel = SchemaFactory.createForClass(CourierPay);