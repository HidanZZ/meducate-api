import { Response } from 'express'
import { startSession } from 'mongoose'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import winston from 'winston'

import { ExpiresInDays } from '@/constants'
import {
  NewPasswordPayload,
  ResetPasswordPayload,
  SignInPayload,
  SignUpPayload,
  VerificationRequestPayload
} from '@/contracts/auth'
import {
  resetPasswordService,
  verificationService,
  userService
} from '@/services'
import { jwtSign } from '@/utils/jwt'
import {
  IBodyRequest,
  ICombinedRequest,
  IContextRequest,
  IParamsRequest,
  IUserRequest
} from '@/contracts/request'
import { createCryptoString } from '@/utils/cryptoString'
import { createDateAddDaysFromNow } from '@/utils/dates'
import { UserMail } from '@/mailer'
import { createHash } from '@/utils/hash'
import { redis } from '@/dataSources'

export const authController = {
  verificationRequest: async (
    { body: { email } }: IBodyRequest<VerificationRequestPayload>,
    res: Response
  ) => {
    const session = await startSession()

    try {
      const user = await userService.getByEmail(email)

      if (!user || user.verified) {
        return res.status(StatusCodes.FORBIDDEN).json({
          message: ReasonPhrases.FORBIDDEN,
          status: StatusCodes.FORBIDDEN
        })
      }

      session.startTransaction()
      const cryptoString = createCryptoString()

      const dateFromNow = createDateAddDaysFromNow(ExpiresInDays.Verification)

      let verification =
        await verificationService.findOneAndUpdateByUserIdAndEmail(
          {
            userId: user.id,
            email,
            accessToken: cryptoString,
            expiresIn: dateFromNow
          },
          session
        )

      if (!verification) {
        verification = await verificationService.create(
          {
            userId: user.id,
            email,
            accessToken: cryptoString,
            expiresIn: dateFromNow
          },
          session
        )

        await userService.addVerificationToUser(
          {
            userId: user.id,
            verificationId: verification.id
          },
          session
        )
      }

      const userMail = new UserMail()

      userMail.verification({
        email: user.email,
        accessToken: cryptoString
      })

      await session.commitTransaction()
      session.endSession()

      return res.status(StatusCodes.OK).json({
        message: ReasonPhrases.OK,
        status: StatusCodes.OK
      })
    } catch (error) {
      winston.error(error)

      if (session.inTransaction()) {
        await session.abortTransaction()
        session.endSession()
      }

      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST
      })
    }
  },

  verification: async (
    { params }: IParamsRequest<{ accessToken: string }>,
    res: Response
  ) => {
    const session = await startSession()
    try {
      const verification = await verificationService.getByValidAccessToken(
        params.accessToken
      )

      if (!verification) {
        return res.status(StatusCodes.FORBIDDEN).json({
          message: ReasonPhrases.FORBIDDEN,
          status: StatusCodes.FORBIDDEN
        })
      }

      session.startTransaction()

      await userService.updateVerificationAndEmailByUserId(
        verification.user,
        verification.email,
        session
      )

      await verificationService.deleteManyByUserId(verification.user, session)

      const { accessToken } = jwtSign(verification.user)

      await session.commitTransaction()
      session.endSession()

      return res.status(StatusCodes.OK).json({
        accessToken,
        message: ReasonPhrases.OK,
        status: StatusCodes.OK
      })
    } catch (error) {
      winston.error(error)

      if (session.inTransaction()) {
        await session.abortTransaction()
        session.endSession()
      }

      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST
      })
    }
  },
  signIn: async (
    { body: { email, password } }: IBodyRequest<SignInPayload>,
    res: Response
  ) => {
    try {
      const user = await userService.getByEmail(email)

      const comparePassword = user?.comparePassword(password)
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: ReasonPhrases.NOT_FOUND,
          status: StatusCodes.NOT_FOUND
        })
      }
      if (!comparePassword) {
        return res.status(StatusCodes.FORBIDDEN).json({
          message: ReasonPhrases.FORBIDDEN,
          status: StatusCodes.FORBIDDEN
        })
      }
      if (!user.verified) {
        return res.status(StatusCodes.FORBIDDEN).json({
          message: ReasonPhrases.FORBIDDEN,
          status: StatusCodes.FORBIDDEN
        })
      }

      const { accessToken } = jwtSign(user.id)

      return res.status(StatusCodes.OK).json({
        data: { accessToken, user },
        message: ReasonPhrases.OK,
        status: StatusCodes.OK
      })
    } catch (error) {
      winston.error(error)

      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST
      })
    }
  },

  signUp: async (
    {
      body: {
        title,
        firstName,
        lastName,
        email,
        password,
        phone,
        country,
        city,
        highestQualification,
        profile,
        speciality,
        yearsOfExperience,
        sector,
        workEnvironment
      }
    }: IBodyRequest<SignUpPayload>,
    res: Response
  ) => {
    const session = await startSession()
    try {
      const isUserExist = await userService.isExistByEmail(email)
      if (isUserExist) {
        //check if user is verified
        const user = await userService.getByEmail(email)
        if (user?.verified) {
          return res.status(StatusCodes.CONFLICT).json({
            message: ReasonPhrases.CONFLICT,
            status: StatusCodes.CONFLICT
          })
        } else {
          //delete user
          await userService.deleteById(user?.id)
        }
      }

      session.startTransaction()
      const hashedPassword = await createHash(password)

      const user = await userService.create(
        {
          title,
          firstName,
          lastName,
          email,
          password: hashedPassword,
          phone,
          country,
          city,
          highestQualification,
          profile,
          speciality,
          yearsOfExperience,
          sector,
          workEnvironment
        },
        session
      )

      const cryptoString = createCryptoString()

      const dateFromNow = createDateAddDaysFromNow(ExpiresInDays.Verification)
      const verification = await verificationService.create(
        {
          userId: user.id,
          email,
          accessToken: cryptoString,
          expiresIn: dateFromNow
        },
        session
      )

      await userService.addVerificationToUser(
        {
          userId: user.id,
          verificationId: verification.id
        },
        session
      )

      const userMail = new UserMail()

      userMail.verification({
        email: user.email,
        accessToken: cryptoString
      })

      await session.commitTransaction()
      session.endSession()

      return res.status(StatusCodes.OK).json({
        email: user.email,
        message: ReasonPhrases.OK,
        status: StatusCodes.OK
      })
    } catch (error) {
      winston.error(error)

      if (session.inTransaction()) {
        await session.abortTransaction()
        session.endSession()
      }

      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST
      })
    }
  },

  signOut: async (
    { context: { user, accessToken } }: IContextRequest<IUserRequest>,
    res: Response
  ) => {
    try {
      await redis.client.set(`expiredToken:${accessToken}`, `${user.id}`, {
        EX: process.env.REDIS_TOKEN_EXPIRATION,
        NX: true
      })

      return res.status(StatusCodes.OK).json({
        message: ReasonPhrases.OK,
        status: StatusCodes.OK
      })
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST
      })
    }
  },

  resetPassword: async (
    { body: { email } }: IBodyRequest<ResetPasswordPayload>,
    res: Response
  ) => {
    const session = await startSession()

    try {
      const user = await userService.getByEmail(email)

      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: ReasonPhrases.NOT_FOUND,
          status: StatusCodes.NOT_FOUND
        })
      }
      console.log('sending reset password email to', email)

      session.startTransaction()

      const cryptoString = createCryptoString()

      const dateFromNow = createDateAddDaysFromNow(ExpiresInDays.ResetPassword)

      const resetPassword = await resetPasswordService.create(
        {
          userId: user.id,
          accessToken: cryptoString,
          expiresIn: dateFromNow
        },
        session
      )

      await userService.addResetPasswordToUser(
        {
          userId: user.id,
          resetPasswordId: resetPassword.id
        },
        session
      )

      const userMail = new UserMail()

      userMail.resetPassword({
        email: user.email,
        accessToken: cryptoString
      })

      await session.commitTransaction()
      session.endSession()
      console.log('password reset email sent to', email)

      return res.status(StatusCodes.OK).json({
        message: ReasonPhrases.OK,
        status: StatusCodes.OK
      })
    } catch (error) {
      winston.error(error)

      if (session.inTransaction()) {
        await session.abortTransaction()
        session.endSession()
      }
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST
      })
    }
  },

  newPassword: async (
    {
      body: { password },
      params
    }: ICombinedRequest<null, NewPasswordPayload, { accessToken: string }>,
    res: Response
  ) => {
    const session = await startSession()
    try {
      const resetPassword = await resetPasswordService.getByValidAccessToken(
        params.accessToken
      )

      if (!resetPassword) {
        console.log('resetpassword not found')

        return res.status(StatusCodes.FORBIDDEN).json({
          message: ReasonPhrases.FORBIDDEN,
          status: StatusCodes.FORBIDDEN
        })
      }

      const user = await userService.getById(resetPassword.user.toString())

      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: ReasonPhrases.NOT_FOUND,
          status: StatusCodes.NOT_FOUND
        })
      }
      if (!user.verified) {
        return res.status(StatusCodes.FORBIDDEN).json({
          message: ReasonPhrases.FORBIDDEN,
          status: StatusCodes.FORBIDDEN
        })
      }

      session.startTransaction()
      const hashedPassword = await createHash(password)

      await userService.updatePasswordByUserId(
        resetPassword.user,
        hashedPassword,
        session
      )

      await resetPasswordService.deleteManyByUserId(user.id, session)

      const { accessToken } = jwtSign(user.id)

      await session.commitTransaction()
      session.endSession()

      return res.status(StatusCodes.OK).json({
        accessToken,
        message: ReasonPhrases.OK,
        status: StatusCodes.OK
      })
    } catch (error) {
      winston.error(error)

      if (session.inTransaction()) {
        await session.abortTransaction()
        session.endSession()
      }

      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST
      })
    }
  }
}
