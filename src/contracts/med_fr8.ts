import { Model ,ObjectId } from 'mongoose'

export interface IMedFr8 {
  _id?: ObjectId;
  dossier_has_code?: string;
  lien_avis_ct: string;
}

export type MedFr8Model = Model<IMedFr8, unknown, unknown>

