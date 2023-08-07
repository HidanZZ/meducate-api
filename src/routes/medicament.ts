import { Router } from 'express';
import { medicamentController } from '@/controllers/medicamentController';

export const medicaments = (router: Router): void => {
    router.get('/medicaments', medicamentController.getAllMedicaments);
    router.get('/medicaments/medicament/:nomDuMedicament', medicamentController.getMedicamentByDenomination);
    router.get('/medicaments/molecule/:substanceActive', medicamentController.getMedicamentByMolecule);
    router.get('/medicaments/similar/:nomDuMedicament', medicamentController.getSimilarMedicamentsByDenomination);
}

