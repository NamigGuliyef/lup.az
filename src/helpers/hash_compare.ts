import { compare, genSalt, hash } from 'bcrypt'

// password hash
export const hashPassword = async (password: string) => {
  return await hash(password, await genSalt(10))
}

// compare password
export const comparePassword = async (password: string, hashPassword: string) => {
  return await compare(password, hashPassword)
}