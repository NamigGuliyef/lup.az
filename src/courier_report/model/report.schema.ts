import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false, timestamps: true })

export class CourierReport {
  @Prop()
  courierId: string
  @Prop()
  fullname: string // name and surname
  @Prop()
  total_earning: number
  @Prop()
  delivered_order: number
  @Prop()
  debt: number
}

export const courierReportModel = SchemaFactory.createForClass(CourierReport)