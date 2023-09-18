import { Model ,ObjectId } from 'mongoose'

export interface IMedFr6 {
  _id?: ObjectId;
  cis_code?: String,
  dossier_has_code: String,
  motif_evaluation: String,
  date_avis_ct: String,
  valeur_smr: String,
  libelle_smr: String
}

export type MedFr6Model = Model<IMedFr6, unknown, unknown>

