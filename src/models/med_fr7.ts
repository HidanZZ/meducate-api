import { Schema, model, Document, Model } from 'mongoose';
import { IMedFr7 , MedFr7Model} from '@/contracts/med_fr7'

const medicamentFr7Schema = new Schema<IMedFr7, MedFr7Model>({
  _id: Schema.Types.ObjectId,
  cis_code: String,
  date_debut_info_secu: String,
  date_fin_info_secu: String,
  texte_info_secu: String
},{ collection: 'med_fr7' });

export const MedFr7 = model<IMedFr7>('MedFr7', medicamentFr7Schema);
