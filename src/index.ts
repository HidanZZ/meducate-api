import express, { Express } from 'express'
import { join } from 'path'
import 'dotenv/config'

import '@/infrastructure/logger'
import { mongoose, redis } from '@/dataSources'
import {
  corsMiddleware,
  authMiddleware,
  notFoundMiddleware
} from '@/middlewares'
import { router } from '@/routes'
import { i18next, i18nextHttpMiddleware } from '@/i18n'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerConfig from './configs/swaggerConfig'
import swaggerUi from 'swagger-ui-express'

mongoose.run()
redis.run()

const app: Express = express()
const specs = swaggerJsdoc(swaggerConfig)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

app.use(
  join('/', process.env.STORAGE_PATH as string),
  express.static(join(__dirname, process.env.STORAGE_PATH as string))
)

app.use(
  express.json({ limit: '10mb' }),
  express.urlencoded({ limit: '10mb', extended: true }),
  corsMiddleware,
  i18nextHttpMiddleware.handle(i18next),
  authMiddleware,
  router,
  notFoundMiddleware
)

app.listen(process.env.APP_PORT)
