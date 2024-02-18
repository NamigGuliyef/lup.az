import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCourierPayDto {
  @IsNotEmpty()
  @IsString()
  @Length(16,16)
  bankCardNumber: string;
  @IsNotEmpty()
  total_earning: string;
  @IsNotEmpty()
  debt: string;
  @IsNotEmpty()
  amount_paid: string;
  @IsNotEmpty()
  status: string;
  @IsNotEmpty()
  username: string;
}
