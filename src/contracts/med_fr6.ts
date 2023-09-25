import { Model ,ObjectId } from 'mongoose'

export interface IMedFr6 {
  _id?: ObjectId;
  cis_code?: string;
  dossier_has_code: string;
  motif_evaluation: string;
  date_avis_ct: string;
  valeur_smr: string;
  libelle_smr: string;
}

export type MedFr6Model = Model<IMedFr6, unknown, unknown>

