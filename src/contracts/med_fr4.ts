import { Model ,ObjectId } from 'mongoose'

export interface IMedFr4 {
  _id?: ObjectId;
  groupe_generique_id: String,
  libelle_groupe_generique: String,
  cis_code?: String,
  type_generique: String,
  numero_tri: String
}

export type MedFr4Model = Model<IMedFr4, unknown, unknown>

