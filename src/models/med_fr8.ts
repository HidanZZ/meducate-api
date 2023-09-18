import { Schema, model, Document, Model } from 'mongoose';
import { IMedFr8 , MedFr8Model} from '@/contracts/med_fr8'

const medicamentFr8Schema = new Schema<IMedFr8, MedFr8Model>({
  _id: Schema.Types.ObjectId,
  dossier_has_code: String,
  lien_avis_ct: String
},{ collection: 'med_fr8' });

export const MedFr8 = model<IMedFr8>('MedF8', medicamentFr8Schema);
