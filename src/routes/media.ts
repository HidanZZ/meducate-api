import { Router } from 'express'

import { authGuard } from '@/guards'
import { mediaController } from '@/controllers'
import { uploadSingleImageMiddleware } from '@/middlewares'

export const media = (router: Router): void => {
  /**
   * @swagger
   * /media/image/upload:
   *   post:
   *     summary: Upload a single image
   *     description: Uploads a single image file for an authenticated user
   *     tags:
   *       - Media
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               image:
   *                 type: string
   *                 format: binary
   *             required:
   *               - image
   *     responses:
   *       200:
   *         description: Image uploaded successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 imageUrl:
   *                   type: string
   *                   format: uri
   *                   description: URL of the uploaded image
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: Internal server error
   */
  router.post(
    '/media/image/upload',
    authGuard.isAuth,
    uploadSingleImageMiddleware,
    mediaController.imageUpload
  )
}
