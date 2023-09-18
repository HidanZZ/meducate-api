import { Model ,ObjectId } from 'mongoose'

export interface IMedFr5 {
  _id?: ObjectId;
  cis_code?: String,
  dossier_has_code: String,
  motif_evaluation: String,
  date_avis_ct: String,
  valeur_asmr: String,
  libelle_asmr: String
}

export type MedFr5Model = Model<IMedFr5, unknown, unknown>

