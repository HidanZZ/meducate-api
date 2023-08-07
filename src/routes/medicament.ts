import { Router } from 'express';
import { medicamentController } from '@/controllers/medicamentController';

export const medicaments = (router: Router): void => {
router.get('/medicaments', medicamentController.getAllMedicaments);
router.get('/medicaments/:nomDuMedicament', medicamentController.getMedicamentByDenomination);
router.get('/medicaments/:substanceActive', medicamentController.getMedicamentByMolecule);
}

