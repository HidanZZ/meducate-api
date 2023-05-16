import { IUser } from './user'

export type SignInPayload = Pick<IUser, 'email' | 'password'>

export type SignUpPayload = Pick<
  IUser,
  | 'title'
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'password'
  | 'phone'
  | 'country'
  | 'city'
  | 'highestQualification'
  | 'profile'
  | 'speciality'
  | 'yearsOfExperience'
  | 'sector'
  | 'workEnvironment'
>

export type ResetPasswordPayload = Pick<IUser, 'email'>

export type NewPasswordPayload = Pick<IUser, 'password'>
