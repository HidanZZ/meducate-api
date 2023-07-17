import { RedisMemoryServer } from 'redis-memory-server'
import { redis } from '@/dataSources'
let redisServer: RedisMemoryServer | null = null

const initializeRedisTestingServer = async (): Promise<void> => {
  redisServer = new RedisMemoryServer()
  const redisPort = await redisServer.getPort()
  const redisHost = await redisServer.getHost()
  const uri = `redis://${redisHost}:${redisPort}`
  process.env.REDIS_URI = uri

  redis.refreshClient()
  console.log('In-memory Redis connected:')
}

const stopRedisTestingServer = async (): Promise<void> => {
  try {
    if (redisServer) {
      await redisServer.stop()
      console.log('In-memory Redis disconnected.')
    }
  } catch (error) {
    console.log('In-memory Redis disconnection ERROR:', error)
  }
}

export { initializeRedisTestingServer, stopRedisTestingServer }
