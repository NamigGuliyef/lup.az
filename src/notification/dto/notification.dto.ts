import { IsNotEmpty, IsOptional } from 'class-validator';
import mongoose from 'mongoose';

export class CreateNotificationDto {
  @IsOptional()
  user: mongoose.Schema.Types.ObjectId;
  @IsNotEmpty()
  category: mongoose.Schema.Types.ObjectId;
  @IsNotEmpty()
  message: string;
}

export class CreateSupportDto {
  // @IsNotEmpty()
  category: mongoose.Schema.Types.ObjectId;
  // @IsNotEmpty()
  message: string;
}
