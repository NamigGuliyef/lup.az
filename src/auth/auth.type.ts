export interface userSignUpResponse {
  message: string
}

export interface UserSignIn {
  phoneNumber: string
  password: string
}

export interface tokenResponse {
  token: string
  message: string
  role: string
}