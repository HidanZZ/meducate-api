import { Model ,ObjectId } from 'mongoose'

export interface IMedFr {
  cis_code: string;
  libelle_presentation: string;
  prix_medicament: string;
  taux_remboursement: string;
  denomination: string;
  forme_pharmaceutique: string;
  voies_administration: string;
  statut_amm: string;
  type_procedure_amm: string;
  etat_commercialisation: string;
  titulaires: string;
  condition_prescription: string;
  libelle_groupe_generique: string;
  texte_info_secu: string;
  dossier_has_code: string;
  lien_avis_ct: string;
  date_debut_info_secu: Date;
  date_fin_info_secu: Date;
  _id: ObjectId;

}

export type MedFrModel = Model<IMedFr, unknown, unknown>