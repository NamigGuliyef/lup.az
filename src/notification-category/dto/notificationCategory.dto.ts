import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNotificationCategoryDto {
  @IsNotEmpty({ message: 'Name is empty' })
  @IsString()
  name: string;
}


export class UpdateNotificationCategoryDto {
  @IsNotEmpty({ message: 'Name is empty' })
  @IsString()
  name: string;
}