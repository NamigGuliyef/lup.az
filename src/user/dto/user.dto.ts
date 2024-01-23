import { IsEmail, IsNotEmpty, IsString, IsPhoneNumber, IsMobilePhone, IsBoolean, Length, Matches } from "class-validator";
import { Types } from "mongoose";

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  @Matches(new RegExp("^[A-Za-z]{3}$"))
  fleetName: string;
  @IsNotEmpty()
  subFleetName: Types.ObjectId // altFleet-in adi (wolt-a getmesin, select-box olacaq, admin panel-de hemin alt-fleet-leri elave etmek olsun, analitika da olsun, hansi kuryerleri elave edib ve s., 5 gun active olmayan kuryer-lerde avtomatik mesaj gelsin)
  @IsNotEmpty()
  @IsString()
  username: string; // Kuryerin istifadeci adi. Ad,soyadindan avtomatik generasiya edilecek. Eli Eliyev (eeliyev) Namiq Quiliyev (nquliyev) Ali Isiyev (aisiyev) Namiq Quliyev (nquliyev2)
  @IsNotEmpty()
  @IsString()
  @Matches(new RegExp("^[A-Za-z]{3}$"))
  courierName: string;
  @IsNotEmpty()
  @IsString()
  @Matches(new RegExp("^[A-Za-z]{3}$"))
  courierSurname: string;
  @IsNotEmpty()
  @IsString()
  @Matches(new RegExp("^[A-Za-z]{3}$"))
  courierFatherName: string;
  @IsNotEmpty()
  @IsPhoneNumber('AZ')
  @IsMobilePhone('az-AZ')
  courierPhone: string;
  @IsNotEmpty()
  courierTerritory: string;
  @IsNotEmpty()
  courierVehicle: string;
  @IsNotEmpty()
  @IsBoolean()
  carAdvertising: boolean;
  @IsNotEmpty()
  @IsString()
  courierAccessories: string;
  // @IsNotEmpty()
  // profilePhoto: string;
  // @IsNotEmpty()
  // driverLicensePhoto: string[];
  // @IsNotEmpty()
  // carTechnicalPassportPhoto: string[];
  @IsNotEmpty()
  @IsString()
  @Length(16)
  bankCardNumber: string;
  @IsNotEmpty()
  @IsString()
  @Length(8, 16)
  password: string;
  @IsNotEmpty()
  @IsString()
  note: string;
}
