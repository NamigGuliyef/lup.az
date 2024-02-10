export interface userSignUpResponse {
  message: string
}

export interface UserSignIn {
  courierPhone: string
  password: string
}

export interface tokenResponse {
  token: string
  message: string
  role: string
}