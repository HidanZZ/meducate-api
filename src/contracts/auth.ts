import { IUser } from './user'

export type SignInPayload = Pick<IUser, 'email' | 'password'>

export type SignUpPayload = Pick<
  IUser,
  | 'title'
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'password'
  | 'phoneNumber'
  | 'country'
  | 'city'
  | 'postalCode'
  | 'highestQualification'
>

export type ResetPasswordPayload = Pick<IUser, 'email'>

export type NewPasswordPayload = Pick<IUser, 'password'>
