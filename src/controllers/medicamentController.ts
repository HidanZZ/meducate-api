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
    const { denomination } = req.params;
    try {
      const medicament = await medicamentService.getMedicamentByDenomination(denomination);
      if (!medicament) {
        return res.status(404).json({ message: 'Medicament not found' });
      }
      return res.status(200).json(medicament);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  getMedicamentByMolecule: async (req: Request, res: Response) => {
    const { molecule } = req.params;
    try {
      const medicament = await medicamentService.getMedicamentByMolecule(molecule);
      if (!medicament) {
        return res.status(404).json({ message: 'Medicament not found' });
      }
      return res.status(200).json(medicament);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};
