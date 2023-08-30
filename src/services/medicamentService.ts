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

  // medicamentService.js

  getMedicamentByDenomination: async (nomDuMedicament: string) => {
    try {
      const medicaments = await Medicament.find({
        nomDuMedicament: { $regex: `^${nomDuMedicament}`, $options: 'i' }
      });
      return medicaments;
    } catch (error) {
      throw new Error('Error fetching medicaments by partial name');
    }
  },

  getMedicamentByMolecule: async (substanceActive: string) => {
    try {
      const medicaments = await Medicament.find({
        substanceActive: { $regex: `^${substanceActive}`, $options: 'i' }
      });
      return medicaments;
    } catch (error) {
      throw new Error('Error fetching medicaments by partial name');
    }
  },
  


  getSimilarMedicamentsByDenomination: async (nomDuMedicament: string) => {
    try {
      const medicament = await Medicament.findOne({ nomDuMedicament });
      if(medicament){
        const medicaments = await Medicament.find({ substanceActive: medicament.substanceActive });
        return medicaments;
      }
      return [];
    } catch (error) {
      throw new Error('Error fetching similar medicaments by denomination');
    }
  },



  getMedicamentById : async (_id: string) => {
    try {
      const medicament = await Medicament.findById(_id);
      return medicament;
    } catch (error) {
      throw new Error('Error fetching medicament by id');
    }
  },
};
