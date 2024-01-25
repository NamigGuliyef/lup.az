import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false, timestamps: true })
export class subFleetName {
  @Prop({ required: true })
  name: string
}

export const subFleetNameModel = SchemaFactory.createForClass(subFleetName)