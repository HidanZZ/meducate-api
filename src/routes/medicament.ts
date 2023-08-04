import { Router } from 'express';
import { medicamentController } from '@/controllers/medicamentController';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Medicament:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         nomDuMedicament:
 *           type: string
 *         substanceActive:
 *           type: string
 *         epi:
 *           type: string
 *         dosage:
 *           type: string
 *         forme:
 *           type: string
 *         presentation:
 *           type: string
 *         statutCommercialisation:
 *           type: string
 *         ppv:
 *           type: string
 *         ph:
 *           type: string
 *
 * /medicaments:
 *   get:
 *     summary: Get all medicaments
 *     description: Fetches all medicaments
 *     tags:
 *       - Medicaments
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Medicament'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/medicaments', medicamentController.getAllMedicaments);

/**
 * @swagger
 * /medicaments/nomDuMedicament/{nomDuMedicament}:
 *   get:
 *     summary: Get medicament by denomination
 *     description: Fetches a medicament by its denomination
 *     tags:
 *       - Medicaments
 *     parameters:
 *       - name: nomDuMedicament
 *         in: path
 *         description: Denomination of the medicament
 *         required: true
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medicament'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Medicament not found
 *       500:
 *         description: Internal server error
 */
router.get('/medicaments/nomDuMedicament/:nomDuMedicament', medicamentController.getMedicamentByDenomination);

/**
 * @swagger
 * /medicaments/substanceActive/{substanceActive}:
 *   get:
 *     summary: Get medicament by molecule
 *     description: Fetches a medicament by its molecule
 *     tags:
 *       - Medicaments
 *     parameters:
 *       - name: substanceActive
 *         in: path
 *         description: Molecule of the medicament
 *         required: true
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medicament'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Medicament not found
 *       500:
 *         description: Internal server error
 */
router.get('/medicaments/substanceActive/:substanceActive', medicamentController.getMedicamentByMolecule);

export default router;
