import { Model ,ObjectId } from 'mongoose'

export interface IMedFr2 {
  _id?: ObjectId;
  cis_code?: String,
  denomination: String,
  forme_pharmaceutique: String,
  voies_administration: String,
  statut_amm: String,
  type_procedure_amm: String,
  etat_commercialisation: String,
  date_amm: String,
  statut_bdm: String,
  numero_autorisation_europeenne: String,
  titulaires: String,
  surveillance_renforcee: String

}

export type MedFr2Model = Model<IMedFr2, unknown, unknown>