import configureApp from '@/configs/appConfig'
import {
  initializeMongoTestingServer,
  stopMongoTestingServer
} from '@/dataSources/virtualDatabase'
import HttpStatusCodes from '@/utils/httpStatusCodes'
import {
  getLatestResetPasswordTokenForUser,
  getLatestVerificationTokenForUser
} from '@/utils/testUtils'
import { Application } from 'express'
import { ReasonPhrases } from 'http-status-codes'
import request from 'supertest'
import {
  initializeRedisTestingServer
  // stopRedisTestingServer
} from '@/dataSources/virtualRedis'
import { userService } from '@/services'

describe('Happy route', () => {
  //fields in the user object
  // title: { type: String, enum: ['Mr', 'Mrs', 'Dr', 'Prof'] },
  // firstName: String,
  // lastName: String,
  // email: String,
  // password: String,
  // phone: String,
  // country: String,
  // city: String,
  // highestQualification: {
  //   type: String,
  //   enum: ['PhD', 'Masters', 'Certificate', 'Other']
  // },
  // profile: {
  //   type: String,
  //   enum: ['Doctor', 'Pharmacist', 'Nurse', 'Patient', 'MedicalStudent'],
  //   required: false
  // },
  // speciality: { type: String, required: false },
  // yearsOfExperience: { type: Number, required: false },
  // sector: { type: String, enum: ['Public', 'Private'], required: false },
  // workEnvironment: {
  //   type: String,
  //   enum: ['Hospital', 'Clinic', 'PrivatePractice', 'Home'],
  //   required: false
  // },
  // institution: { type: String, required: false },
  //Setting up test use data
  const user = {
    title: 'Mr',
    firstName: 'Test',
    lastName: 'User',
    email: 'user@test.com',
    password: 'TestingApp2022@',
    phone: '1234567890',
    country: 'Nigeria',
    city: 'Lagos',
    highestQualification: 'PhD',
    profile: 'Doctor',
    speciality: 'Cardiology',
    yearsOfExperience: '5',
    sector: 'Public',
    workEnvironment: 'Hospital',
    institution: 'Test Hospital'
  }

  let testApp: Application
  let userToken: string
  //   let secreToken: string

  //We run beforeAll() in order to have the Jest to wait for all the promises inside of the callback before the tests are executed.
  beforeAll(async () => {
    //Setting up the email testing services

    //Initializing the virtual MongoDB database and the Server application
    await initializeRedisTestingServer()

    await initializeMongoTestingServer()

    testApp = configureApp()
  })

  afterAll(async () => {
    //Stopping the virtual MongoDB database
    await stopMongoTestingServer()
    // await stopRedisTestingServer()
  })

  it('should sign up a user with a valid user object', done => {
    request(testApp)
      .post('/auth/sign-up')
      .send(user)
      .expect('Content-Type', /json/)
      .expect(HttpStatusCodes.OK)
      .expect(
        {
          email: user.email,
          message: ReasonPhrases.OK,
          status: HttpStatusCodes.OK
        },
        done
      )
  })
  it('Request email verification with a valid email', async () => {
    const response = await request(testApp)
      .post('/auth/verification/request')
      .send({
        email: user.email
      })

    expect(response.statusCode).toBe(HttpStatusCodes.OK)
    expect(response.body.message).toBe(ReasonPhrases.OK)
    expect(response.body.status).toBe(HttpStatusCodes.OK)
  })
  it('Request email verification with an invalid email format.', async () => {
    const response = await request(testApp)
      .post('/auth/verification/request')
      .send({
        email: 'invalidEmail'
      })

    expect(response.statusCode).toBe(HttpStatusCodes.BAD_REQUEST)
    expect(response.body.message).toBe(ReasonPhrases.BAD_REQUEST)
    expect(response.body.status).toBe(HttpStatusCodes.BAD_REQUEST)
  })
  it('Verify email', async () => {
    const token = await getLatestVerificationTokenForUser(user.email)

    const response = await request(testApp).get('/auth/verification/' + token)

    expect(response.statusCode).toBe(HttpStatusCodes.OK)
    expect(response.body.message).toBe(ReasonPhrases.OK)
    expect(response.body.status).toBe(HttpStatusCodes.OK)
    expect(response.body.accessToken).toBeTruthy()
  }, 60000)
  it('Request email verification for a user who is already verified.', async () => {
    const response = await request(testApp)
      .post('/auth/verification/request')
      .send({
        email: user.email
      })

    expect(response.statusCode).toBe(HttpStatusCodes.FORBIDDEN)
    expect(response.body.message).toBe(ReasonPhrases.FORBIDDEN)
    expect(response.body.status).toBe(HttpStatusCodes.FORBIDDEN)
  })
  it('user already exists', async () => {
    const response = await request(testApp).post('/auth/sign-up').send(user)

    expect(response.statusCode).toBe(HttpStatusCodes.CONFLICT)
    expect(response.body.message).toBe(ReasonPhrases.CONFLICT)
    expect(response.body.status).toBe(HttpStatusCodes.CONFLICT)
  })
  it('Login user', async () => {
    const response = await request(testApp)
      .post('/auth/sign-in')
      .send({
        email: user.email,
        password: user.password
      })
      .expect('Content-Type', /json/)
      .expect(HttpStatusCodes.OK)

    expect(response.body).toEqual(
      expect.objectContaining({
        data: {
          accessToken: expect.any(String),
          user: expect.objectContaining({
            email: user.email,
            verified: true,
            _id: expect.anything(),
            __v: expect.any(Number)
          })
        },
        message: ReasonPhrases.OK,
        status: HttpStatusCodes.OK
      })
    )

    // Save the user token
    userToken = response.body.data.accessToken
  })
  it('Sign in with an invalid password', async () => {
    const response = await request(testApp).post('/auth/sign-in').send({
      email: user.email,
      password: 'invalidPassword'
    })

    expect(response.statusCode).toBe(HttpStatusCodes.FORBIDDEN)
    expect(response.body.message).toBe(ReasonPhrases.FORBIDDEN)
    expect(response.body.status).toBe(HttpStatusCodes.FORBIDDEN)
  })
  it('Sign out a user with a valid access token', async () => {
    const response = await request(testApp)
      .get('/auth/sign-out')
      .set({
        Authorization: `Bearer ${userToken}`
      })

    expect(response.statusCode).toBe(HttpStatusCodes.OK)
    expect(response.body.message).toBe(ReasonPhrases.OK)
    expect(response.body.status).toBe(HttpStatusCodes.OK)
  })
  it('Sign out a user with an invalid access token', async () => {
    const response = await request(testApp)
      .get('/auth/sign-out')
      .set({
        Authorization: `Bearer ${userToken}`
      })

    expect(response.statusCode).toBe(HttpStatusCodes.UNAUTHORIZED)
    expect(response.body.message).toBe(ReasonPhrases.UNAUTHORIZED)
    expect(response.body.status).toBe(HttpStatusCodes.UNAUTHORIZED)
  })
  it('Request a password reset with a valid email', async () => {
    const response = await request(testApp).post('/auth/password/reset').send({
      email: user.email
    })

    expect(response.statusCode).toBe(HttpStatusCodes.OK)
    expect(response.body.message).toBe(ReasonPhrases.OK)
    expect(response.body.status).toBe(HttpStatusCodes.OK)
  })
  it('Set a new password with a valid reset password token', async () => {
    const token = await getLatestResetPasswordTokenForUser(user.email)

    const response = await request(testApp)
      .post('/auth/password/new/' + token)
      .send({
        password: user.password
      })

    expect(response.statusCode).toBe(HttpStatusCodes.OK)
    expect(response.body.message).toBe(ReasonPhrases.OK)
    expect(response.body.status).toBe(HttpStatusCodes.OK)
    expect(response.body.accessToken).toBeTruthy()
  })
})
describe('Bad route', () => {
  const user = {
    title: 'Mr',
    firstName: 'Test',
    lastName: 'User',
    email: 'user@test.com',
    password: 'TestingApp2022@',
    phone: '1234567890',
    country: 'Nigeria',
    city: 'Lagos',
    highestQualification: 'PhD',
    profile: 'Doctor',
    speciality: 'Cardiology',
    yearsOfExperience: '5',
    sector: 'Public',
    workEnvironment: 'Hospital',
    institution: 'Test Hospital'
  }

  let testApp: Application

  beforeAll(async () => {
    //Initializing the virtual MongoDB database and the Server application
    await initializeMongoTestingServer()
    await initializeRedisTestingServer()

    testApp = configureApp()
  })
  afterAll(async () => {
    await stopMongoTestingServer()
    console.log('mongo stopped')
  })
  it('should return an error when signing up with an invalid email format', done => {
    request(testApp)
      .post('/auth/sign-up')
      .send({
        ...user,
        email: 'invalidEmail'
      })
      .expect('Content-Type', /json/)
      .expect(HttpStatusCodes.BAD_REQUEST)
      .expect(
        {
          message: ReasonPhrases.BAD_REQUEST,
          status: HttpStatusCodes.BAD_REQUEST
        },
        done
      )
  })
  it('should return an error when sign up request body has a type conflict', done => {
    request(testApp)
      .post('/auth/sign-up')
      .send({
        ...user,
        yearsOfExperience: 5
      })
      .expect('Content-Type', /json/)
      .expect(HttpStatusCodes.BAD_REQUEST)
      .expect(
        {
          message: ReasonPhrases.BAD_REQUEST,
          status: HttpStatusCodes.BAD_REQUEST
        },
        done
      )
  })
  it('should return an error when signing up with a weak password', done => {
    request(testApp)
      .post('/auth/sign-up')
      .send({
        ...user,
        password: '1234'
      })
      .expect('Content-Type', /json/)
      .expect(HttpStatusCodes.BAD_REQUEST)
      .expect(
        {
          message: ReasonPhrases.BAD_REQUEST,
          status: HttpStatusCodes.BAD_REQUEST
        },
        done
      )
  })
  it('Verify the user with an invalid verification token', done => {
    request(testApp)
      .get('/auth/verification/invalidToken')
      .expect('Content-Type', /json/)
      .expect(HttpStatusCodes.FORBIDDEN)
      .expect(
        {
          message: ReasonPhrases.FORBIDDEN,
          status: HttpStatusCodes.FORBIDDEN
        },
        done
      )
  })
  it('Sign in with an invalid email (email does not exist in the database)', async () => {
    const response = await request(testApp).post('/auth/sign-in').send({
      email: 'email@email.com',
      password: user.password
    })

    expect(response.statusCode).toBe(HttpStatusCodes.NOT_FOUND)
    expect(response.body.message).toBe(ReasonPhrases.NOT_FOUND)
    expect(response.body.status).toBe(HttpStatusCodes.NOT_FOUND)
  })
  it('Request a password reset with an invalid email format', async () => {
    const response = await request(testApp).post('/auth/password/reset').send({
      email: 'invalidEmail'
    })

    expect(response.statusCode).toBe(HttpStatusCodes.BAD_REQUEST)
    expect(response.body.message).toBe(ReasonPhrases.BAD_REQUEST)
    expect(response.body.status).toBe(HttpStatusCodes.BAD_REQUEST)
  })
  it('Request a password reset for a user who does not exist', async () => {
    const randomString = Math.random().toString(36).substring(7)
    const response = await request(testApp)
      .post('/auth/password/reset')
      .send({
        email: randomString + '@testapp.com'
      })

    expect(response.statusCode).toBe(HttpStatusCodes.NOT_FOUND)
    expect(response.body.message).toBe(ReasonPhrases.NOT_FOUND)
    expect(response.body.status).toBe(HttpStatusCodes.NOT_FOUND)
  })
  it('Set a new password with an invalid reset password token.', async () => {
    const response = await request(testApp)
      .post('/auth/password/new/invalidToken')
      .send({
        password: user.password
      })

    expect(response.statusCode).toBe(HttpStatusCodes.FORBIDDEN)
    expect(response.body.message).toBe(ReasonPhrases.FORBIDDEN)
    expect(response.body.status).toBe(HttpStatusCodes.FORBIDDEN)
  })
  it('Set a new password for a user who does no longer exist', async () => {
    const randomString = Math.random().toString(36).substring(7)
    // Step 1: Create a user and initiate a password reset
    const transientUser = {
      ...user,
      email: randomString + '@testapp.com'
    }
    console.log('transientUser', transientUser)

    // Create the user
    await request(testApp).post('/auth/sign-up').send(transientUser)

    // Initiate password reset
    await request(testApp).post('/auth/password/reset').send({
      email: transientUser.email
    })

    // Step 2: Delete the user
    await userService.deleteByEmail(transientUser.email)

    // Retrieve the password reset token for the deleted user
    const resetPasswordToken = await getLatestResetPasswordTokenForUser(
      transientUser.email
    )

    // Attempt to reset the password
    const response = await request(testApp)
      .post('/auth/password/new/' + resetPasswordToken)
      .send({
        password: transientUser.password
      })

    // Expect NOT_FOUND
    expect(response.statusCode).toBe(HttpStatusCodes.NOT_FOUND)
    expect(response.body.message).toBe(ReasonPhrases.NOT_FOUND)
    expect(response.body.status).toBe(HttpStatusCodes.NOT_FOUND)
  })
})
