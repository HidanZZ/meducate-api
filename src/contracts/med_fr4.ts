import { Model ,ObjectId } from 'mongoose'

export interface IMedFr4 {
  _id?: ObjectId;
  groupe_generique_id: string;
  libelle_groupe_generique: string;
  cis_code?: string;
  type_generique: string;
  numero_tri: string;
}

export type MedFr4Model = Model<IMedFr4, unknown, unknown>

