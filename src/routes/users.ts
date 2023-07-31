import { Router } from 'express'

import { authGuard } from '@/guards'
import { userController } from '@/controllers'
import { userValidation } from '@/validations'

export const users = (router: Router): void => {
  /**
   * @swagger
   * /me:
   *   get:
   *     summary: Get user profile
   *     description: Retrieves the authenticated user's profile information
   *     tags:
   *       - Users
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: User profile retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       401:
   *         description: Unauthorized
   */
  router.get('/me', authGuard.isAuth, userController.me)

  /**
   * @swagger
   * /user/update:
   *   post:
   *     summary: Update user profile
   *     description: Updates the authenticated user's profile information
   *     tags:
   *       - Users
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               // Add properties for the user profile update here
   *             required:
   *               // Add required properties for the user profile update here
   *     responses:
   *       200:
   *         description: User profile updated successfully
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized
   */
  router.post(
    '/user/update',
    authGuard.isAuth,
    userValidation.updateProfile,
    userController.updateProfile
  )

  /**
   * @swagger
   * /user/update/password:
   *   post:
   *     summary: Update user password
   *     description: Updates the authenticated user's password
   *     tags:
   *       - Users
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               oldPassword:
   *                 type: string
   *               newPassword:
   *                 type: string
   *             required:
   *               - oldPassword
   *               - newPassword
   *     responses:
   *       200:
   *         description: User password updated successfully
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized
   */
  router.post(
    '/user/update/password',
    authGuard.isAuth,
    userValidation.updatePassword,
    userController.updatePassword
  )
  /**
   * @swagger
   * /user/update/avatar:
   *   post:
   *     summary: Update user avatar
   *     description: Updates the authenticated user's avatar
   *     tags:
   *       - Users
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               avatar:
   *                 type: string
   *                 format: binary
   *             required:
   *               - avatar
   *     responses:
   *       200:
   *         description: User avatar updated successfully
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized
   */
  router.post(
    '/user/update/avatar',
    authGuard.isAuth,
    userValidation.updateAvatar,
    userController.updateAvatar
  )
  /**
   * @swagger
   * /user/delete:
   *   post:
   *     summary: Delete user profile
   *     description: Deletes the authenticated user's profile
   *     tags:
   *       - Users
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               password:
   *                 type: string
   *             required:
   *               - password
   *     responses:
   *       200:
   *         description: User profile deleted successfully
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized
   */
  router.post(
    '/user/delete',
    authGuard.isAuth,
    userValidation.deleteProfile,
    userController.deleteProfile
  )
}
