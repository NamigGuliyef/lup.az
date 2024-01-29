import { IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length, Matches } from "class-validator";
import { Types } from "mongoose";

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  @Matches(new RegExp("^[A-Za-z]{3,30}$"))
  fleetName: string;
  @IsNotEmpty()
  subFleetName: Types.ObjectId // altFleet-in adi (wolt-a getmesin, select-box olacaq, admin panel-de hemin alt-fleet-leri elave etmek olsun, analitika da olsun, hansi kuryerleri elave edib ve s., 5 gun active olmayan kuryer-lerde avtomatik mesaj gelsin)
  // @IsNotEmpty()
  // @IsString()
  // username: string; // Kuryerin istifadeci adi. Ad,soyadindan avtomatik generasiya edilecek. Eli Eliyev (eeliyev) Namiq Quiliyev (nquliyev) Ali Isiyev (aisiyev) Namiq Quliyev (nquliyev2)
  @IsNotEmpty()
  @IsString()
  @Matches(new RegExp("^[A-Za-z]{3,20}$"))
  courierName: string;
  @IsNotEmpty()
  @IsString()
  @Matches(new RegExp("^[A-Za-z]{3,20}$"))
  courierSurname: string;
  @IsNotEmpty()
  @IsString()
  @Matches(new RegExp("^[A-Za-z]{3,20}$"))
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
  @IsString()
  carAdvertising: string;
  @IsNotEmpty()
  @IsString()
  courierAccessories: string;
  @IsNotEmpty()
  @IsString()
  @Length(16,16)
  bankCardNumber: string;
  @IsNotEmpty()
  @IsString()
  @Length(8, 16)
  password: string;
  @IsNotEmpty()
  @IsString()
  note: string;
}


export class UpdateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  @Matches(new RegExp("^[A-Za-z]{3,30}$"))
  fleetName: string;
  @IsNotEmpty()
  subFleetName: Types.ObjectId // altFleet-in adi (wolt-a getmesin, select-box olacaq, admin panel-de hemin alt-fleet-leri elave etmek olsun, analitika da olsun, hansi kuryerleri elave edib ve s., 5 gun active olmayan kuryer-lerde avtomatik mesaj gelsin)
  // @IsNotEmpty()
  // @IsString()
  // username: string; // Kuryerin istifadeci adi. Ad,soyadindan avtomatik generasiya edilecek. Eli Eliyev (eeliyev) Namiq Quiliyev (nquliyev) Ali Isiyev (aisiyev) Namiq Quliyev (nquliyev2)
  @IsNotEmpty()
  @IsString()
  @Matches(new RegExp("^[A-Za-z]{3,20}$"))
  courierName: string;
  @IsNotEmpty()
  @IsString()
  @Matches(new RegExp("^[A-Za-z]{3,20}$"))
  courierSurname: string;
  @IsNotEmpty()
  @IsString()
  @Matches(new RegExp("^[A-Za-z]{3,20}$"))
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
  @IsString()
  carAdvertising: string;
  @IsNotEmpty()
  @IsString()
  courierAccessories: string;
  @IsNotEmpty()
  @IsString()
  @Length(16,16)
  bankCardNumber: string;
  @IsNotEmpty()
  @IsString()
  @Length(8, 16)
  password: string;
  @IsNotEmpty()
  @IsString()
  note: string;
  @IsOptional()
  @Length(8, 16)
  old_password: string;
  @IsOptional()
  @Length(8, 16)
  new_password: string;

  
}