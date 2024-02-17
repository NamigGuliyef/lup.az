import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: true })
export class CourierReport {
  @Prop()
  courierId: string;
  @Prop()
  fullname: string; // name and surname
  @Prop()
  total_earning: string;
  @Prop({ default: '-' })
  amount_paid: string;
  @Prop()
  delivered_order: string;
  @Prop()
  debt: string;
  @Prop({ default: 'Ödənişi gözləyir' })
  status: string;
}

export const courierReportModel = SchemaFactory.createForClass(CourierReport);
