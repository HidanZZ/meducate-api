import { UserSwaggerSchema } from '@/models/user'
import { Options } from 'swagger-jsdoc'

const swaggerConfig: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Meducate API',
      version: '1.0.0',
      description: 'Meducate API Documentation'
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: UserSwaggerSchema
      }
    },
    servers: [
      {
        url: 'http://localhost:8000' // Update this to match your server's address
      }
    ]
  },
  apis: ['./src/routes/*.ts'] // You may need to change the path depending on your project structure
}

export default swaggerConfig
