import { Schema, model } from 'mongoose';
import { IMedFr9 , MedFr9Model} from '@/contracts/med_fr9'

const medicamentFrSchema = new Schema<IMedFr9, MedFr9Model>({
    
    _id: {type: Schema.Types.ObjectId,required: true},
    cis_code: {type: String, default: "",required: true},
    designation_element_pharmaceutique: {type: String, default: "",required: true},
    denomination_substance: {type: String, default: "",required: true},
    dosage_substance: {type: String, default: "",required: true},
    ref_dosage: {type: String, default: "",required: true},
    nature_composant: {type: String, default: "",required: true},

},{ collection: 'med_fr9' });

export const MedFr9 = model<IMedFr9>('MedFr9', medicamentFrSchema);
