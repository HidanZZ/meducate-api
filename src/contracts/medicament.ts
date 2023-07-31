import { Model ,ObjectId } from 'mongoose'

export interface IMedicament {
    id: ObjectId
    denomination: string
    dosage: string
    presentation: string
    molecule: string
    forme: string
    prix: Number
    commercialisation: string
    EPI: string
  }

export type MedicamentModel = Model<IMedicament, unknown, unknown>