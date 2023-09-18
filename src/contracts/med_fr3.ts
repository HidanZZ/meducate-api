import { Model ,ObjectId } from 'mongoose'

export interface IMedFr3 {
  _id?: ObjectId;
  cis_code?: String,
  condition_prescription: String
}

export type MedFr3Model = Model<IMedFr3, unknown, unknown>

