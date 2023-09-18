import { Schema, model, Document, Model } from 'mongoose';
import { IMedFr1 , MedFr1Model} from '@/contracts/med_fr1'

const medicamentFr1Schema = new Schema<IMedFr1, MedFr1Model>({
  
  _id: Schema.Types.ObjectId,
  cis_code: String,
  cip7: String,
  libelle_presentation: String,
  statut_admin_presentation: String,
  etat_commercialisation_presentation: String,
  date_declaration_commercialisation: String,
  cip13: String,
  agrement_collectivites: String,
  taux_remboursement: String,
  prix_medicament: String,
  indications_remboursement: String
},{ collection: 'med_fr1' });

export const MedFr1 = model<IMedFr1>('MedFr1', medicamentFr1Schema);
