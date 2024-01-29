import { IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateNotificationDto {
  @IsNotEmpty()
  category: mongoose.Schema.Types.ObjectId;
  @IsNotEmpty()
  message: string;
}

export class CreateSupportDto {
  @IsNotEmpty()
  category: mongoose.Schema.Types.ObjectId;
  @IsNotEmpty()
  message: string;
}
