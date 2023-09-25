import { Model ,ObjectId } from 'mongoose'

export interface IMedFr2 {
  _id: ObjectId;
  cis_code: string;
  denomination: string;
  forme_pharmaceutique: string;
  voies_administration: string;
  statut_amm: string;
  type_procedure_amm: string;
  etat_commercialisation: string;
  date_amm: string;
  statut_bdm: string;
  numero_autorisation_europeenne: string;
  titulaires: string;
  surveillance_renforcee: string;

}

export type MedFr2Model = Model<IMedFr2, unknown, unknown>