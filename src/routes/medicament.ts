import { Router } from 'express';
import { medicamentController } from '@/controllers/medicamentController';

const router = Router();

router.get('/medicaments', medicamentController.getAllMedicaments);
router.get('/medicaments/denomination/:denomination', medicamentController.getMedicamentByDenomination);
router.get('/medicaments/molecule/:molecule', medicamentController.getMedicamentByMolecule);

export default router;
