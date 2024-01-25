import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateSubFleetNameDto {
  @IsNotEmpty({ message: 'Name is empty' })
  @IsString()
  @Matches(new RegExp("^[a-zA-Z]{3,20}$"))
  name: string
}
