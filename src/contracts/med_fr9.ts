import { Model ,ObjectId } from 'mongoose'

export interface IMedFr9 {
  _id: ObjectId;
    cis_code : string;
    designation_element_pharmaceutique : string;
    denomination_substance : string;
    dosage_substance : string;
    ref_dosage : string;
    nature_composant : string;
}

export type MedFr9Model = Model<IMedFr9, unknown, unknown>
