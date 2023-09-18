import { Model ,ObjectId } from 'mongoose'

export interface IMedFr1 {
  _id?: ObjectId;
  cis_code?: String;
  cip7: String;
  libelle_presentation: String;
  statut_admin_presentation: String;
  etat_commercialisation_presentation: String;
  date_declaration_commercialisation: String;
  cip13: String;
  agrement_collectivites: String;
  taux_remboursement: String;
  prix_medicament: String;
  indications_remboursement: String

}

export type MedFr1Model = Model<IMedFr1, unknown, unknown>