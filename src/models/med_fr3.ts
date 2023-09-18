import { Schema, model, Document, Model } from 'mongoose';
import { IMedFr3 , MedFr3Model} from '@/contracts/med_fr3'

const medicamentFr3Schema = new Schema<IMedFr3, MedFr3Model>({
  _id: Schema.Types.ObjectId,
  cis_code: String,
  condition_prescription: String
},{ collection: 'med_fr3' });

export const MedFr3 = model<IMedFr3>('MedFr3', medicamentFr3Schema);
