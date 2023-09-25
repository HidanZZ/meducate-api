import { Model ,ObjectId } from 'mongoose'

export interface IMedFr5 {
  _id: ObjectId;
  cis_code: string;
  dossier_has_code: string;
  motif_evaluation: string;
  date_avis_ct: string;
  valeur_asmr: string;
  libelle_asmr: string; 
}

export type MedFr5Model = Model<IMedFr5, unknown, unknown>

