import { Model ,ObjectId } from 'mongoose'

export interface IMedFr {
  cis_code: string;
  libelle_presentation: string;
  statut_admin_presentation: string;
  etat_commercialisation_presentation: string;
  date_declaration_commercialisation: string; 
  taux_remboursement: string;
  prix_medicament: string;
  denomination: string;
  forme_pharmaceutique: string;
  voies_administration: string;
  statut_amm: string;
  type_procedure_amm: string;
  etat_commercialisation: string;
  date_amm: string;
  surveillance_renforcee: string;
  titulaires: string;
  condition_prescription: string;
  libelle_groupe_generique: string;
  motif_evaluation: string;
  date_avis_ct: string;
  valeur_asmr: string;
  libelle_asmr: string; 
  valeur_smr: string;
  libelle_smr: string;
  date_debut_info_secu: string;
  date_fin_info_secu: string;
  texte_info_secu: string;
  dossier_has_code: string;
  lien_avis_ct: string;
  designation_element_pharmaceutique: string;
  denomination_substance: string;
  dosage_substance: string;
  ref_dosage: string;
  nature_composant: string;
  _id: ObjectId;
}

export type MedFrModel = Model<IMedFr, unknown, unknown>