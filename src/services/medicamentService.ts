import { Medicament } from '@/models/medicament';

export const medicamentService = {
  getAllMedicaments: async () => {
    try {
      const medicaments = await Medicament.find({});
      return medicaments;
    } catch (error) {
      throw new Error('Error fetching all medicaments');
    }
  },

  getMedicamentByDenomination: async (nomDuMedicament: string) => {
    try {
      const medicament = await Medicament.findOne({ nomDuMedicament });
      return medicament;
    } catch (error) {
      throw new Error('Error fetching medicament by denomination');
    }
  },

  getMedicamentByMolecule: async (substanceActive: string) => {
    try {
      const medicament = await Medicament.findOne({ substanceActive });
      return medicament;
    } catch (error) {
      throw new Error('Error fetching medicament by molecule');
    }
  },
};
