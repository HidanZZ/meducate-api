import { Model ,ObjectId } from 'mongoose'

export interface IMedFr8 {
  _id?: ObjectId;
  dossier_has_code?: String,
  lien_avis_ct: String
}

export type MedFr8Model = Model<IMedFr8, unknown, unknown>

