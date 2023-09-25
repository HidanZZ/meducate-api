import { Model ,ObjectId } from 'mongoose'

export interface IMedFr1 {
  _id?: ObjectId;
  cis_code?: string;
  cip7: string;
  libelle_presentation: string;
  statut_admin_presentation: string;
  etat_commercialisation_presentation: string;
  date_declaration_commercialisation: string;
  cip13: string;
  agrement_collectivites: string;
  taux_remboursement: string;
  prix_medicament: string;
  indications_remboursement: string

}

export type MedFr1Model = Model<IMedFr1, unknown, unknown>