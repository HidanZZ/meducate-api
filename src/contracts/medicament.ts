import { Model ,ObjectId } from 'mongoose'

export interface IMedicament {
  _id: ObjectId;
  nomDuMedicament: string;
  substanceActive: string;
  epi: string;
  dosage: string;
  forme: string;
  presentation: string;
  statutCommercialisation: string;
  ppv: string;
  ph: string;

}

export type MedicamentModel = Model<IMedicament, unknown, unknown>