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

describe('Media route tests', () => {
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
  //image located in back\public\images\test.png
  const currentDir = process.cwd()
  const imagePath = resolve(currentDir, 'public', 'images', 'test.png')
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
  it('should not upload image', done => {
    request(testApp)
      .post('/media/image/upload')
      .set('Authorization', `Bearer ${userToken}`) // setting the token in the Authorization header
      .attach('file', imagePath)
      .expect('Content-Type', /json/)
      .expect(HttpStatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err)

        expect(res.body.status).toBe(HttpStatusCodes.OK)
        expect(res.body.message).toBe(ReasonPhrases.OK)
        done()
      })
  })
  it('should not upload image when field is incorrect', done => {
    request(testApp)
      .post('/media/image/upload')
      .set('Authorization', `Bearer ${userToken}`) // setting the token in the Authorization header
      .attach('image', imagePath)
      .expect('Content-Type', /json/)
      .expect(HttpStatusCodes.BAD_REQUEST)
      .end((err, res) => {
        if (err) return done(err)

        expect(res.body.status).toBe(HttpStatusCodes.BAD_REQUEST)
        expect(res.body.message).toBe(ReasonPhrases.BAD_REQUEST)
        done()
      })
  })
  it('should not upload image when no file is attached', done => {
    request(testApp)
      .post('/media/image/upload')
      .set('Authorization', `Bearer ${userToken}`)
      .expect('Content-Type', /json/)
      .expect(HttpStatusCodes.BAD_REQUEST)
      .end((err, res) => {
        if (err) return done(err)

        expect(res.body.status).toBe(HttpStatusCodes.BAD_REQUEST)
        expect(res.body.message).toBe(ReasonPhrases.BAD_REQUEST)
        done()
      })
  })
})
