import { Schema, model, models} from 'mongoose';
import { IMedicament , MedicamentModel} from '@/contracts/medicament';

const medicamentSchema = new Schema<IMedicament, MedicamentModel>({
  _id: { type: Schema.Types.ObjectId, required: true },
  nomDuMedicament: { type: String, required: true },
  substanceActive: { type: String, required: true },
  epi: { type: String, required: true },
  dosage: { type: String, required: true },
  forme: { type: String, required: true },
  presentation: { type: String, required: true },
  statutCommercialisation: { type: String, required: true },
  ppv: { type: String, required: true },
  ph: { type: String, required: true },
},{ collection: 'medicaments' });

export const Medicament = model<IMedicament>('Medicament', medicamentSchema);
