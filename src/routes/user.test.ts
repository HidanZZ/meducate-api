import request from 'supertest'
import {
  initializeMongoTestingServer,
  stopMongoTestingServer
} from '@/dataSources/virtualDatabase'
import configureApp from '@/configs/appConfig'
import HttpStatusCodes from '@/utils/httpStatusCodes'
import { ReasonPhrases } from 'http-status-codes'
import { Application } from 'express'
import { initializeRedisTestingServer } from '@/dataSources/virtualRedis'
import { getLatestVerificationTokenForUser } from '@/utils/testUtils'
import { resolve } from 'path'

describe('User route tests', () => {
  let testApp: Application
  let userToken: string
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

  beforeAll(async () => {
    await initializeMongoTestingServer()
    await initializeRedisTestingServer()
    testApp = configureApp()

    // Signup and login the user to get the token
    await request(testApp).post('/auth/sign-up').send(user)
    const token = await getLatestVerificationTokenForUser(user.email)

    await request(testApp).get('/auth/verification/' + token)
    const response = await request(testApp).post('/auth/sign-in').send({
      email: user.email,
      password: user.password
    })

    userToken = response.body.data.accessToken
  })

  afterAll(async () => {
    await stopMongoTestingServer()
  })
  describe('GET /me', () => {
    it('should get user profile with authenticated request', done => {
      request(testApp)
        .get('/me')
        .set('Authorization', `Bearer ${userToken}`) // setting the token in the Authorization header
        .expect('Content-Type', /json/)
        .expect(HttpStatusCodes.OK)
        .end((err, res) => {
          if (err) return done(err)

          expect(res.body.status).toBe(HttpStatusCodes.OK)
          expect(res.body.message).toBe(ReasonPhrases.OK)
          expect(res.body.data.email).toBe(user.email)
          done()
        })
    })
  })
  describe('POST /user/update', () => {
    it('should update user profile', done => {
      const updatedUser = {
        firstName: 'Test',
        lastName: 'User'
      }
      request(testApp)
        .post('/user/update')
        .set('Authorization', `Bearer ${userToken}`)
        .send(updatedUser)
        .expect(HttpStatusCodes.OK)
        .end((err, res) => {
          if (err) return done(err)

          expect(res.body.status).toBe(HttpStatusCodes.OK)
          expect(res.body.message).toBe(ReasonPhrases.OK)
          expect(res.body.data.firstName).toBe(updatedUser.firstName)
          expect(res.body.data.lastName).toBe(updatedUser.lastName)
          done()
        })
    })
    it('should not update user profile with invalid request body', done => {
      const updatedUser = {
        firstName: 'T',
        lastName: 'U'
      }
      request(testApp)
        .post('/user/update')
        .set('Authorization', `Bearer ${userToken}`)
        .send(updatedUser)
        .expect(HttpStatusCodes.BAD_REQUEST)
        .end((err, res) => {
          if (err) return done(err)

          expect(res.body.status).toBe(HttpStatusCodes.BAD_REQUEST)
          expect(res.body.message).toBe(ReasonPhrases.BAD_REQUEST)
          done()
        })
    })
  })
  describe('POST /user/update/password', () => {
    it('should not update when old password is incorrect', done => {
      const newPassword = 'TestingApp2022@'
      const updatedPassword = {
        oldPassword: 'TestingApp2022',
        newPassword
      }
      request(testApp)
        .post('/user/update/password')
        .set('Authorization', `Bearer ${userToken}`)
        .send(updatedPassword)
        .expect(HttpStatusCodes.FORBIDDEN)
        .end((err, res) => {
          if (err) return done(err)

          expect(res.body.status).toBe(HttpStatusCodes.FORBIDDEN)
          expect(res.body.message).toBe(ReasonPhrases.FORBIDDEN)
          done()
        })
    })

    it('should not update when new password is equal to old password', done => {
      const newPassword = 'TestingApp2022@'
      const updatedPassword = {
        oldPassword: user.password,
        newPassword
      }
      request(testApp)
        .post('/user/update/password')
        .set('Authorization', `Bearer ${userToken}`)
        .send(updatedPassword)
        .expect(HttpStatusCodes.FORBIDDEN)
        .end((err, res) => {
          if (err) return done(err)

          expect(res.body.status).toBe(HttpStatusCodes.FORBIDDEN)
          expect(res.body.message).toBe(ReasonPhrases.FORBIDDEN)
          done()
        })
    })

    it('should update user password', done => {
      const newPassword = 'TestingApp2024@'
      const updatedPassword = {
        oldPassword: user.password,
        newPassword
      }
      request(testApp)
        .post('/user/update/password')
        .set('Authorization', `Bearer ${userToken}`)
        .send(updatedPassword)
        .expect(HttpStatusCodes.OK)
        .end((err, res) => {
          if (err) return done(err)

          expect(res.body.status).toBe(HttpStatusCodes.OK)
          expect(res.body.message).toBe(ReasonPhrases.OK)
          user.password = newPassword
          done()
        })
    })
  })
  describe('POST /user/update/avatar', () => {
    //image located in back\public\images\test.png
    const currentDir = process.cwd()
    const imagePath = resolve(currentDir, 'public', 'images', 'test.png')
    it('should update user avatar', async () => {
      const response = await request(testApp)
        .post('/media/image/upload')
        .set('Authorization', `Bearer ${userToken}`)
        .attach('file', imagePath)

      const imageId = response.body.data.id
      const updatedAvatar = {
        imageId
      }

      const res = await request(testApp)
        .post('/user/update/avatar')
        .set('Authorization', `Bearer ${userToken}`)
        .send(updatedAvatar)
      expect(res.statusCode).toBe(HttpStatusCodes.OK)
      expect(res.body.status).toBe(HttpStatusCodes.OK)
      expect(res.body.message).toBe(ReasonPhrases.OK)
    })

    it('should not update user avatar with invalid imageId', async () => {
      const updatedAvatar = {
        imageId: 'invalidImageId'
      }

      const response = await request(testApp)
        .post('/user/update/avatar')
        .set('Authorization', `Bearer ${userToken}`)
        .send(updatedAvatar)

      expect(response.statusCode).toBe(HttpStatusCodes.BAD_REQUEST)
      expect(response.body.status).toBe(HttpStatusCodes.BAD_REQUEST)
      expect(response.body.message).toBe(ReasonPhrases.BAD_REQUEST)
    })
  })
  describe('POST /user/delete', () => {
    it('should not delete user with invalid password', async () => {
      const response = await request(testApp)
        .post('/user/delete')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ password: 'invalidPassword' })

      expect(response.statusCode).toBe(HttpStatusCodes.FORBIDDEN)
      expect(response.body.status).toBe(HttpStatusCodes.FORBIDDEN)
      expect(response.body.message).toBe(ReasonPhrases.FORBIDDEN)
    })
    it('should delete user', async () => {
      const response = await request(testApp)
        .post('/user/delete')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ password: user.password })

      expect(response.statusCode).toBe(HttpStatusCodes.OK)
      expect(response.body.status).toBe(HttpStatusCodes.OK)
      expect(response.body.message).toBe(ReasonPhrases.OK)
    })
  })
})
