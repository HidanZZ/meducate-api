import { Schema, model, Document, Model } from 'mongoose';
import { IMedFr , MedFrModel} from '@/contracts/med_fr'

const medicamentFrSchema = new Schema<IMedFr, MedFrModel>({
    
    _id: {type: Schema.Types.ObjectId, default: ""},
    cis_code: {type: String, default: ""},
    libelle_presentation: {type: String, default: ""},
    prix_medicament: {type: String, default: ""},
    denomination: {type: String, default: ""},
    forme_pharmaceutique: {type: String, default: ""},
    voies_administration: {type: String, default: ""},
    statut_amm: {type: String, default: ""},
    type_procedure_amm: {type: String, default: ""},
    etat_commercialisation: {type: String, default: ""},
    titulaires: {type: String, default: ""},
    condition_prescription: {type: String, default: ""},
    libelle_groupe_generique: {type: String, default: ""},
    texte_info_secu: {type: String, default: ""},
    dossier_has_code: {type: String, default: ""},
    lien_avis_ct: {type: String, default: ""}

},{ collection: 'med_fr' });

export const MedFr = model<IMedFr>('MedFr', medicamentFrSchema);
