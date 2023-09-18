import { Model ,ObjectId } from 'mongoose'

export interface IMedFr7 {
  _id?: ObjectId;
  cis_code?: String,
  date_debut_info_secu: Date,
  date_fin_info_secu: Date,
  texte_info_secu: String
}

export type MedFr7Model = Model<IMedFr7, unknown, unknown>

