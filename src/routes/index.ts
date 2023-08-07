import { Router } from 'express'

import { auth } from './auth'
import { users } from './users'
import { media } from './media'
import { webinar } from './webinar'
import { chat } from './chat'
import { medicaments } from './medicament'


const router: Router = Router()

const routes: {
  [key: string]: (router: Router) => void
} = { auth, users, media, chat, webinar, medicaments }

for (const route in routes) {
  routes[route](router)
}

router.get('/', (req, res) => {
  res.send('Hello World!')
})

export { router }
