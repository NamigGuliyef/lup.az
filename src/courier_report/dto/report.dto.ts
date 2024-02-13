import { IsNotEmpty } from "class-validator"

export class CreateCourierReportDto {
  @IsNotEmpty()
  courierId: string
  @IsNotEmpty()
  fullname: string // name and surname
  @IsNotEmpty()
  total_earning: number
  @IsNotEmpty()
  delivered_order: number
  @IsNotEmpty()
  debt: number
}