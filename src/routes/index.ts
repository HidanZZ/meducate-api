import { Router } from 'express'

import { auth } from './auth'
import { users } from './users'
import { media } from './media'
import { authGuard } from '@/guards'

const router: Router = Router()

const routes: {
  [key: string]: (router: Router) => void
} = { auth, users, media }

for (const route in routes) {
  routes[route](router)
}
router.get('/', authGuard.isGuest, (req, res) => {
  res.send('Hello World!')
})

export { router }
