import { IsMobilePhone, IsNotEmpty, IsPhoneNumber } from "class-validator"

export interface userSignUpResponse {
  message: string
}

export class UserSignIn {
  @IsNotEmpty({ message: 'Phone is empty' })
  @IsPhoneNumber('AZ')
  @IsMobilePhone('az-AZ')
  courierPhone: string
  @IsNotEmpty({ message: 'Password is empty' })
  password: string
}


export interface tokenResponse {
  token: string
  message: string
  role: string
}