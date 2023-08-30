import { Request, Response } from 'express';
import { medicamentService } from '@/services/medicamentService';

export const medicamentController = {
  getAllMedicaments: async (req: Request, res: Response) => {
    try {
      const medicaments = await medicamentService.getAllMedicaments();
      return res.status(200).json(medicaments);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  getMedicamentByDenomination: async (req: Request, res: Response) => {
    const { nomDuMedicament } = req.params;
    try {
      const medicaments = await medicamentService.getMedicamentByDenomination(nomDuMedicament);
      if (medicaments.length === 0) {
        return res.status(404).json({ message: 'No medicaments found' });
      }
      return res.status(200).json(medicaments);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },  

  getMedicamentByMolecule: async (req: Request, res: Response) => {
    const { substanceActive } = req.params;
    try {
      const medicaments = await medicamentService.getMedicamentByMolecule(substanceActive);
      if (!medicaments) {
        return res.status(404).json({ message: 'No medicaments found' });
      }
      return res.status(200).json(medicaments);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  
  getSimilarMedicamentsByDenomination: async (req: Request, res: Response) => {
    const { nomDuMedicament } = req.params;
    try {
      const medicaments = await medicamentService.getSimilarMedicamentsByDenomination(nomDuMedicament);
      if (!medicaments) {
        return res.status(404).json({ message: 'Medicament not found' });
      }
      return res.status(200).json(medicaments);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },


  getMedicamentById: async (req: Request, res: Response) => {
    const { _id } = req.params;
    try {
      const medicament = await medicamentService.getMedicamentById(_id);
      if (!medicament) {
        return res.status(404).json({ message: 'Medicament not found' });
      }
      return res.status(200).json(medicament);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};
