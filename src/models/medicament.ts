import { Schema, model } from 'mongoose';

import { IMedicament, MedicamentModel } from '@/contracts/medicament';

const schema = new Schema<IMedicament,MedicamentModel>({
  denomination: { type: String, required: true },
  dosage: { type: String, required: true },
  presentation: { type: String, required: true },
  molecule: { type: String, required: true },
  forme: { type: String, required: true },
  prix: { type: Number, required: true },
  commercialisation: { type: String, required: true },
  EPI: { type: String, required: false },
});

export const Medicament = model<IMedicament>('Medicament', schema);
