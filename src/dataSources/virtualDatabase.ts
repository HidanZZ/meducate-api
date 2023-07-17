import mongoose from 'mongoose'
import { MongoMemoryReplSet } from 'mongodb-memory-server'

let mongoServer: MongoMemoryReplSet | null = null

const initializeMongoTestingServer = async (): Promise<void> => {
  mongoServer = await MongoMemoryReplSet.create({ replSet: { count: 1 } })
  const mongoUri = mongoServer.getUri()

  try {
    await mongoose.connect(mongoUri)
    console.log('In-memory Database connected:')
  } catch (error) {
    console.log('In-memory Database connection ERROR:', error)
  }
}

const stopMongoTestingServer = async (): Promise<void> => {
  try {
    if (mongoServer) {
      await mongoose.disconnect()
      await mongoServer.stop()
      console.log('In-memory Database disconnected.')
    }
  } catch (error) {
    console.log('In-memory Database disconnection ERROR:', error)
  }
}

export { initializeMongoTestingServer, stopMongoTestingServer }
