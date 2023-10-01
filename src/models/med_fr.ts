import { Schema, model } from 'mongoose';
import { IMedFr , MedFrModel} from '@/contracts/med_fr'

const medicamentFrSchema = new Schema<IMedFr, MedFrModel>({
    
    _id: {type: Schema.Types.ObjectId,required: true},
    cis_code: {type: String, default: "",required: true},
    libelle_presentation: {type: String, default: "",required: true},
    statut_admin_presentation: {type: String, default: "",required: true},
    etat_commercialisation_presentation: {type: String, default: "",required: true},
    date_declaration_commercialisation: {type: String, default: "",required: true},
    taux_remboursement: {type: String, default: "",required: true},
    prix_medicament: {type: String, default: "",required: true},
    denomination: {type: String, default: "",required: true},
    forme_pharmaceutique: {type: String, default: "",required: true},
    voies_administration: {type: String, default: "",required: true},
    statut_amm: {type: String, default: "",required: true},
    type_procedure_amm: {type: String, default: "",required: true},
    etat_commercialisation: {type: String, default: "",required: true},
    titulaires: {type: String, default: "",required: true},
    date_amm: {type: String, default: "",required: true},
    surveillance_renforcee: {type: String, default: "",required: true},
    condition_prescription: {type: String, default: "",required: true},
    libelle_groupe_generique: {type: String, default: "",required: true},
    motif_evaluation: {type: String, default: "",required: true},
    date_avis_ct: {type: String, default: "",required: true},
    valeur_asmr: {type: String, default: "",required: true},
    libelle_asmr: {type: String, default: "",required: true},
    valeur_smr: {type: String, default: "",required: true},
    libelle_smr: {type: String, default: "",required: true},
    date_debut_info_secu: {type: String, default: "",required: true},
    date_fin_info_secu: {type: String, default: "",required: true},
    texte_info_secu: {type: String, default: "",required: true},
    dossier_has_code: {type: String, default: "",required: true},
    lien_avis_ct: {type: String, default: "",required: true},
    designation_element_pharmaceutique: {type: String, default: "",required: true},
    denomination_substance: {type: String, default: "",required: true},
    dosage_substance: {type: String, default: "",required: true},
    ref_dosage: {type: String, default: "",required: true},
    nature_composant: {type: String, default: "",required: true},


},{ collection: 'med_fr' });

export const MedFr = model<IMedFr>('MedFr', medicamentFrSchema);