import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class User {
  @Prop({ required: true })
  email: string;
  @Prop({ default: "MotoFly", required: true })
  fleetName: string;
  @Prop({ required: true, ref: 'subfleetname' })
  subFleetName: mongoose.Schema.Types.ObjectId; // altFleet-in adi (wolt-a getmesin, select-box olacaq, admin panel-de hemin alt-fleet-leri elave etmek olsun, analitika da olsun, hansi kuryerleri elave edib ve s., 5 gun active olmayan kuryer-lerde avtomatik mesaj gelsin)
  @Prop()
  woltId: string;
  @Prop({ required: true })
  username: string; // Kuryerin istifadeci adi. Ad,soyadindan avtomatik generasiya edilecek. Eli Eliyev (eeliyev) Namiq Quiliyev (nquliyev) Ali Isiyev (aisiyev) Namiq Quliyev (nquliyev2)
  @Prop({ required: true })
  courierName: string;
  @Prop({ required: true })
  courierSurname: string;
  @Prop({ required: true })
  courierFatherName: string;
  @Prop({ required: true })
  courierPhone: string;
  @Prop({ required: true })
  courierTerritory: string;
  @Prop({ required: true })
  courierVehicle: string;
  @Prop({ required: true })
  carAdvertising: string;
  @Prop({ required: true })
  courierAccessories: string;
  @Prop({ required: true })
  profilePhoto: string[];
  @Prop({ required: true })
  idCard: string[];
  @Prop()
  driverLicensePhoto: string[];
  @Prop()
  carTechnicalPassportPhoto: string[];
  @Prop({ required: true })
  bankCardNumber: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  note: string;
  @Prop({ required: true, ref: 'notification' })
  notifications: [mongoose.Schema.Types.ObjectId];
  @Prop({ required: true, ref: 'report' })
  myPaymentIds: [mongoose.Schema.Types.ObjectId];
  @Prop({ default: 'user', required: true })
  role: string;
  _id: any;
  @Prop({ default: false, required: true })
  isActive: boolean
  @Prop({ default: "Xeyr", required: true })
  official: string
  @Prop({ required: true })
  cash_order: string
}

export const userModel = SchemaFactory.createForClass(User);
