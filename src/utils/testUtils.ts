// testUtils.ts
import { Verification, ResetPassword } from '@/models'

export const getLatestVerificationTokenForUser = async (email: string) => {
  // Get the latest document from the `verification` collection for specific user email
  const latestTokenDocument = await Verification.findOne({ email: email }) // Find verification document for user email
    .sort({ createdAt: -1 }) // Sort in descending order by `createdAt` to get the latest document
    .exec()

  const latestToken = latestTokenDocument?.accessToken

  return latestToken
}

export const getLatestResetPasswordTokenForUser = async (email: string) => {
  const latestTokenDocument = await ResetPassword.findOne({ email: email })
    .sort({ createdAt: -1 })
    .exec()

  const latestToken = latestTokenDocument?.accessToken

  return latestToken
}
