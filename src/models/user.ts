import { Schema, model } from 'mongoose'
import { compareSync } from 'bcrypt'

import { IUser, IUserMethods, UserModel } from '@/contracts/user'

const schema = new Schema<IUser, UserModel, IUserMethods>(
  {
    title: { type: String, enum: ['Mr', 'Mrs', 'Dr', 'Prof'] },
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phone: String,
    country: String,
    city: String,
    // postalCode: String,
    highestQualification: {
      type: String,
      enum: ['PhD', 'Masters', 'Certificate', 'Other']
    },
    profile: {
      type: String,
      enum: ['Doctor', 'Pharmacist', 'Nurse', 'Patient', 'MedicalStudent'],
      required: false
    },
    speciality: { type: String, required: false },
    yearsOfExperience: { type: Number, required: false },
    sector: { type: String, enum: ['Public', 'Private'], required: false },
    workEnvironment: {
      type: String,
      enum: ['Hospital', 'Clinic', 'PrivatePractice', 'Home'],
      required: false
    },
    institution: { type: String, required: false },
    verified: { type: Boolean, default: false },
    verifications: [{ type: Schema.Types.ObjectId, ref: 'Verification' }],
    resetPasswords: [{ type: Schema.Types.ObjectId, ref: 'ResetPassword' }]
  },
  { timestamps: true }
)

schema.methods.comparePassword = function (password: string) {
  return compareSync(password, this.password)
}

schema.methods.toJSON = function () {
  const obj = this.toObject()

  delete obj.password
  delete obj.verifications
  delete obj.resetPasswords

  return obj
}
export const UserSwaggerSchema = {
  type: 'object',
  properties: {
    title: { type: 'string', enum: ['Mr', 'Mrs', 'Dr', 'Prof'] },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
    phone: { type: 'string' },
    country: { type: 'string' },
    city: { type: 'string' },
    // postalCode: { type: 'string' },
    highestQualification: {
      type: 'string',
      enum: ['PhD', 'Masters', 'Certificate', 'Other']
    },
    profile: {
      type: 'string',
      enum: ['Doctor', 'Pharmacist', 'Nurse', 'Patient', 'MedicalStudent'],
      required: false
    },
    speciality: { type: 'string', required: false },
    yearsOfExperience: { type: 'number', required: false },
    sector: { type: 'string', enum: ['Public', 'Private'], required: false },
    workEnvironment: {
      type: 'string',
      enum: ['Hospital', 'Clinic', 'PrivatePractice', 'Home'],
      required: false
    },
    institution: { type: 'string', required: false },
    verified: { type: 'boolean', default: false }
  }
}

export const User = model<IUser, UserModel>('User', schema)
