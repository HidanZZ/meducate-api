import { Medicament } from '@/models/medicament';
import { IMedicament } from '@/contracts/medicament';

export const medicamentService = {
  getAllMedicaments: async () => {
    try {
      const medicaments = await Medicament.find({});
      return medicaments;
    } catch (error) {
      throw new Error('Error fetching all medicaments');
    }
  },

  getMedicamentByDenomination: async (denomination: string) => {
    try {
      const medicament = await Medicament.findOne({ denomination });
      return medicament;
    } catch (error) {
      throw new Error('Error fetching medicament by denomination');
    }
  },

  getMedicamentByMolecule: async (molecule: string) => {
    try {
      const medicament = await Medicament.findOne({ molecule });
      return medicament;
    } catch (error) {
      throw new Error('Error fetching medicament by molecule');
    }
  },
};
