import { Schema, model, Document, Model } from 'mongoose';
import { IMedFr6 , MedFr6Model} from '@/contracts/med_fr6'

const medicamentFr6Schema = new Schema<IMedFr6, MedFr6Model>({
  _id: Schema.Types.ObjectId,
  cis_code: String,
  dossier_has_code: String,
  motif_evaluation: String,
  date_avis_ct: String,
  valeur_smr: String,
  libelle_smr: String
},{ collection: 'med_fr6' });

export const MedFr6 = model<IMedFr6>('MedFr6', medicamentFr6Schema);
