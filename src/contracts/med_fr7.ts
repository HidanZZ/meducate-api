;import { Model ,ObjectId } from 'mongoose'

export interface IMedFr7 {
  _id?: ObjectId;
  cis_code?: string;
  date_debut_info_secu: Date;
  date_fin_info_secu: Date;
  texte_info_secu: string
}

export type MedFr7Model = Model<IMedFr7, unknown, unknown>

