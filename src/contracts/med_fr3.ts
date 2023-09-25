import { Model ,ObjectId } from 'mongoose'

export interface IMedFr3 {
  _id?: ObjectId;
  cis_code?: string;
  condition_prescription: string;
}

export type MedFr3Model = Model<IMedFr3, unknown, unknown>

