import { Router } from 'express'

import { authController } from '@/controllers'
import { authGuard } from '@/guards'
import { authValidation } from '@/validations'

export const auth = (router: Router): void => {
  /**
   * @swagger
   * /auth/sign-in:
   *   post:
   *     summary: Sign in an existing user
   *     description: Authenticates an existing user with email and password
   *     tags:
   *       - Authentication
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *               password:
   *                 type: string
   *             required:
   *               - email
   *               - password
   *     responses:
   *       200:
   *         description: User signed in successfully
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized
   */
  router.post(
    '/auth/sign-in',
    authGuard.isGuest,
    authValidation.signIn,
    authController.signIn
  )
  /**
   * @swagger
   * /auth/sign-up:
   *   post:
   *     summary: Sign up a new user
   *     description: Registers a new user with detailed information
   *     tags:
   *       - Authentication
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *               firstName:
   *                 type: string
   *               lastName:
   *                 type: string
   *               email:
   *                 type: string
   *                 format: email
   *               password:
   *                 type: string
   *               phone:
   *                 type: string
   *               country:
   *                 type: string
   *               city:
   *                 type: string
   *               highestQualification:
   *                 type: string
   *               profile:
   *                 type: string
   *               speciality:
   *                 type: string
   *               yearsOfExperience:
   *                 type: integer
   *               sector:
   *                 type: string
   *               workEnvironment:
   *                 type: string
   *               verified:
   *                 type: boolean
   *             required:
   *               - title
   *               - firstName
   *               - lastName
   *               - email
   *               - password
   *               - phone
   *               - country
   *               - city
   *               - highestQualification
   *     responses:
   *       201:
   *         description: User signed up successfully
   *       400:
   *         description: Bad request
   */

  router.post(
    '/auth/sign-up',
    authGuard.isGuest,
    authValidation.signUp,
    authController.signUp
  )
  /**
   * @swagger
   * /auth/sign-out:
   *   get:
   *     summary: Sign out a user
   *     description: Signs out an authenticated user
   *     tags:
   *       - Authentication
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: User signed out successfully
   *       401:
   *         description: Unauthorized
   */
  router.get('/auth/sign-out', authGuard.isAuth, authController.signOut)
  /**
   * @swagger
   * /auth/password/reset:
   *   post:
   *     summary: Reset password
   *     description: Sends a password reset link to a user's email
   *     tags:
   *       - Authentication
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *             required:
   *               - email
   *     responses:
   *       200:
   *         description: Password reset link sent successfully
   *       400:
   *         description: Bad request
   *       404:
   *         description: User not found
   */
  router.post(
    '/auth/password/reset',
    authGuard.isGuest,
    authValidation.resetPassword,
    authController.resetPassword
  )
  /**
   * @swagger
   * /auth/password/new/{accessToken}:
   *   post:
   *     summary: Set a new password
   *     description: Sets a new password for the user using the provided access token
   *     tags:
   *       - Authentication
   *     parameters:
   *       - in: path
   *         name: accessToken
   *         schema:
   *           type: string
   *         required: true
   *         description: Access token from the password reset email
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               newPassword:
   *                 type: string
   *             required:
   *               - newPassword
   *     responses:
   *       200:
   *         description: Password updated successfully
   *       400:
   *         description: Bad request
   *       401:
   *         description: Invalid access token
   */
  router.post(
    '/auth/password/new/:accessToken',
    authValidation.newPassword,
    authController.newPassword
  )
}
