import { Schema, model, Document, Model } from 'mongoose';
import { IMedFr4 , MedFr4Model} from '@/contracts/med_fr4'

const medicamentFr4Schema = new Schema<IMedFr4, MedFr4Model>({
  _id: Schema.Types.ObjectId,
  groupe_generique_id: String,
  libelle_groupe_generique: String,
  cis_code: String,
  type_generique: String,
  numero_tri: String
},{ collection: 'med_fr4' });

export const MedFr4 = model<IMedFr4>('MedFr4', medicamentFr4Schema);
