import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCourierPayDto {
  @IsNotEmpty()
  @IsString()
  @Length(16,16)
  bankCardNumber: string;
  @IsNotEmpty()
  amount_paid: number;
  @IsNotEmpty()
  status: string;
  @IsNotEmpty()
  username: string;
}
