import configureApp from './configs/appConfig'
import { mongoose, redis } from '@/dataSources'

mongoose.run()
redis.run()
const app = configureApp()

app
  .listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port ${process.env.APP_PORT}`)
  })
  .on('error', (error: Error) => {
    console.log(error)
    process.exit(1)
  })
