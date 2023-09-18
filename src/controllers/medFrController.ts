import { Request, Response } from 'express';
import { medFrService } from '@/services/medFrService';

export const medFrController = {

  getMedicamentByDenomination: async (req: Request, res: Response) => {
    const { nomDuMedicament } = req.params;
    try {
      const medicament = await medFrService.getMedicamentByDenomination(nomDuMedicament);
      
      return res.status(200).json(medicament);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },  

  getMedicamentById: async (req: Request, res: Response) => {
    const { _id } = req.params;
    try {
      const medicament = await medFrService.getMedicamentById(_id);
      return res.status(200).json(medicament);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },  

  
};
