import { Model, ObjectId } from 'mongoose'

export interface IVerification {
  email: string
  accessToken: string
  expiresIn: Date
  user: ObjectId
}

export interface IResetPassword {
  accessToken: string
  expiresIn: Date
  user: ObjectId
}

export interface IUser {
  id: ObjectId
  title: 'Mr' | 'Mrs' | 'Dr' | 'Prof'
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
  country: string
  city: string
  highestQualification: 'PhD' | 'Masters' | 'Certificate' | 'Other'
  profile?: 'Doctor' | 'Pharmacist' | 'Nurse' | 'Patient' | 'MedicalStudent'
  speciality?: string
  yearsOfExperience?: string
  sector?: 'Public' | 'Private'
  workEnvironment?: 'Hospital' | 'Clinic' | 'PrivatePractice' | 'Home'
  institution?: string
  verified: boolean
  verifications?: ObjectId[]
  resetPasswords?: ObjectId[]
}

export interface IUserMethods {
  comparePassword: (password: string) => boolean
}

export type UserModel = Model<IUser, unknown, IUserMethods>

export type VerificationRequestPayload = Pick<IUser, 'email'>

export type UpdateProfilePayload = Required<
  Pick<IUser, 'firstName' | 'lastName'>
>

export type UpdateEmailPayload = Pick<IUser, 'email' | 'password'>

export interface UpdatePasswordPayload {
  oldPassword: string
  newPassword: string
}

export interface DeleteProfilePayload {
  password: string
}
