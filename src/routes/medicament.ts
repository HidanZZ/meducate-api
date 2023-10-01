import { Router } from 'express';
import { medicamentController } from '@/controllers/medicamentController';
import { medFrController } from '@/controllers/medFrController';

export const medicaments = (router: Router): void => {
    
    router.get('/medicaments', medicamentController.getAllMedicaments);
    router.get('/medicaments/medicament/:nomDuMedicament', medicamentController.getMedicamentByDenomination);
    router.get('/medicaments/molecule/:substanceActive', medicamentController.getMedicamentByMolecule);
    router.get('/medicaments/similar/:nomDuMedicament', medicamentController.getSimilarMedicamentsByDenomination);
    router.get('/medicaments/:_id', medicamentController.getMedicamentById); 
    router.get('/medicaments/medFr/:nomDuMedicament', medFrController.getMedicamentByDenomination);
    router.get('/medicaments/medFr/id/:_id', medFrController.getMedicamentById);
    router.get('/medicaments/medFr/molecule/:molecule', medFrController.getMedicamentByMolecule);
}
