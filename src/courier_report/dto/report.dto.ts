import { IsNotEmpty } from 'class-validator';

export class UpdateReportStatusDto {
  @IsNotEmpty()
  status: string;
}
