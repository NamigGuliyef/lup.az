export interface userSignUpResponse {
  message: string
}

export interface UserSignIn {
  email: string
  password: string
}

export interface tokenResponse {
  token: string
  message: string
  role: string
}