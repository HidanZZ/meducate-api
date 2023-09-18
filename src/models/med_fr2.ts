import { Schema, model, Document, Model } from 'mongoose';
import { IMedFr2 , MedFr2Model} from '@/contracts/med_fr2'

const medicamentFr2Schema = new Schema<IMedFr2, MedFr2Model>({
  _id: Schema.Types.ObjectId,
  cis_code: String,
  denomination: String,
  forme_pharmaceutique: String,
  voies_administration: String,
  statut_amm: String,
  type_procedure_amm: String,
  etat_commercialisation: String,
  date_amm: String,
  statut_bdm: String,
  numero_autorisation_europeenne: String,
  titulaires: String,
  surveillance_renforcee: String
},{ collection: 'med_fr2' });

export const MedFr2 = model<IMedFr2>('MedFr2', medicamentFr2Schema);
