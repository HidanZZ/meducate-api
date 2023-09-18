import { Model ,ObjectId } from 'mongoose'

export interface IMedFr {
  _id?: ObjectId,
  cis_code?: String,
  libelle_presentation: String,
  prix_medicament: String,
  denomination: String,
  forme_pharmaceutique: String,
  voies_administration: String,
  statut_amm: String,
  type_procedure_amm: String,
  etat_commercialisation: String,
  titulaires: String,
  condition_prescription: String,
  libelle_groupe_generique: String,
  texte_info_secu: String,
  dossier_has_code: String,
  lien_avis_ct: String



}

export type MedFrModel = Model<IMedFr, unknown, unknown>