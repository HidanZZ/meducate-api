import { Router } from 'express'

import { authGuard } from '@/guards'
import { mediaController } from '@/controllers'
import { uploadSingleImageMiddleware } from '@/middlewares'

export const webinar = (router: Router): void => {
/**
   * @swagger
   * /webinar/new:
   *   post:
   *     summary: Create a new webinar
   *     description: Creates a new webinar
   *     tags:
   *       - Webinar
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              title:
   *                type: string
   *              date:
   *                type: string
   *                format: date
   *              start_time:
   *                type: string
   *                format: time
   *              end_time:
   *                type: string
   *                format: time
   *              speaker:
   *                type: object
   *                properties:
   *                  id:
   *                    type: number
   *                  firstName:
   *                    type: string
   *                  lastName:
   *                    type: string
   *                  picture:
   *                    type: string
   *                  company:
   *                    type: string
   *                  jobTitle:
   *                    type: string
   *                  description:
   *                    type: string
   *            required:
   *              - title
   *              - date
   *              - start_time
   *              - end_time
   *              - speaker
   *     responses:
   *       200:
   *         description: User signed in successfully
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unautho
*/
  router.post(
    '/webinar/new',
    authGuard.isAuth,
    uploadSingleImageMiddleware,
    mediaController.imageUpload
  )
}
