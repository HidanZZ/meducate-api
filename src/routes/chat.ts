import { chatController } from '@/controllers/chatController'
import { authGuard } from '@/guards'
import { Router } from 'express'

export const chat = (router: Router): void => {
  router.post('/chats/send-msg', authGuard.isAuth, chatController.sendMessage)
  router.get('/chats', authGuard.isAuth, chatController.getChats)
  router.get('/chats/:id', authGuard.isAuth, chatController.getChatById)
  router.get(
    '/chats/get-ai-response/:id',
    authGuard.isAuth,
    chatController.getAiResponse
  )
}
