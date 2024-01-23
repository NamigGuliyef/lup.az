import { Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class userModel {
  email: string;
  fleetName: string;
  subFleetName: mongoose.Schema.Types.ObjectId; // altFleet-in adi (wolt-a getmesin, select-box olacaq, admin panel-de hemin alt-fleet-leri elave etmek olsun, analitika da olsun, hansi kuryerleri elave edib ve s., 5 gun active olmayan kuryer-lerde avtomatik mesaj gelsin)
  username: string; // Kuryerin istifadeci adi. Ad,soyadindan avtomatik generasiya edilecek. Eli Eliyev (eeliyev) Namiq Quiliyev (nquliyev) Ali Isiyev (aisiyev) Namiq Quliyev (nquliyev2)
  courierName: string;
  courierSurname: string;
  courierFatherName: string;
  courierPhone: string;
  courierTerritory: string;
  courierVehicle: string;
  carAdvertising: boolean;
  courierAccessories: string;
  profilePhoto: string;
  driverLicensePhoto: string[];
  carTechnicalPassportPhoto: string[];
  bankCardNumber: string;
  password: string;
  note: string;
}
