import { Schema, model, Document, Model } from 'mongoose';
import { IMedFr9, MedFr9Model } from '@/contracts/med_fr9'

const medicamentFr8Schema = new Schema<IMedFr9, MedFr9Model>({
    _id: Schema.Types.ObjectId,
    cis_code: String,
    designation_element_pharmaceutique: String,
    code_substance: String,
    denomination_substance: String,
    dosage_substance: String,
    ref_dosage: String,
    nature_composant: String,
    numero_lien_substance: String,
}, { collection: 'med_fr9' });

export const MedFr9 = model<IMedFr9>('MedF9', medicamentFr8Schema);
