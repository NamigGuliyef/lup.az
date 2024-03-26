import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateSubFleetNameDto {
  @IsNotEmpty({ message: 'Name is empty' })
  @IsString()
  @Matches(new RegExp("^[a-zA-Zşəıöğüç]{3,20}$"))
  name: string
}


export class UpdateSubFleetNameDto {
  @IsNotEmpty({ message: 'Name is empty' })
  @IsString()
  @Matches(new RegExp("^[a-zA-Zşəıöğüç]{3,20}$"))
  name: string
}
