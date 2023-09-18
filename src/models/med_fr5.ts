import { Schema, model, Document, Model } from 'mongoose';
import { IMedFr5 , MedFr5Model} from '@/contracts/med_fr5'

const medicamentFr5Schema = new Schema<IMedFr5, MedFr5Model>({
  _id: Schema.Types.ObjectId,
  cis_code: String,
  dossier_has_code: String,
  motif_evaluation: String,
  date_avis_ct: String,
  valeur_asmr: String,
  libelle_asmr: String
},{ collection: 'med_fr5' });

export const MedFr5 = model<IMedFr5>('MedFr5', medicamentFr5Schema);
