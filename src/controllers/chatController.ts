import { Response } from 'express'
import { ICombinedRequest, IUserRequest } from '@/contracts/request'
import { ChatReponse, MessagePayload } from '@/contracts/chat'
import { chatService } from '@/services/chatService'
// import winston from 'winston'

export const chatController = {
  sendMessage: async (
    {
      context: { user },
      body: { message, chatId }
    }: ICombinedRequest<IUserRequest, MessagePayload>,
    res: Response
  ) => {
    let newChat = false
    if (!chatId) {
      newChat = true
    }

    try {
      let id = chatId
      if (newChat) {
        const chat = await chatService.create({
          title: 'New Chat',
          description: 'New Chat Description',
          userId: user.id,
          lastMessage: {
            senderId: user.id,
            message: message,
            time: new Date().toISOString()
          },
          messages: [
            {
              senderId: user.id,
              message: message,
              time: new Date().toISOString()
            }
          ]
        })
        id = chat[0].id
      } else {
        //chatId is never null here
        await chatService.addMessageById({
          id: chatId!,
          message: {
            senderId: user.id,
            message: message,
            time: new Date().toISOString()
          }
        })
      }

      return res.status(200).json({
        id,
        message: 'Message sent',
        status: 200
      })
    } catch (error) {
      return res.status(400).json({
        message: 'Something went wrong',
        status: 400
      })
    }
  },
  getChatById: async (
    {
      params: { id }
    }: ICombinedRequest<
      null,
      null,
      {
        id: string
      }
    >,
    res: Response
  ) => {
    try {
      const chat = await chatService.getById(id)

      return res.status(200).json(chat)
    } catch (error) {
      return res.status(400).json({
        message: 'Something went wrong',
        status: 400
      })
    }
  },
  getChats: async (
    { context: { user } }: ICombinedRequest<IUserRequest, null, null>,
    res: Response
  ) => {
    try {
      const chats = await chatService.getChatsByUserId(user.id)

      const chatsResponse: ChatReponse[] = chats.map(chat => {
        return {
          id: chat.id,
          title: chat.title,
          description: chat.description,
          lastMessage: chat.lastMessage
        }
      })

      return res.status(200).json(chatsResponse)
    } catch (error) {
      return res.status(400).json({
        message: 'Something went wrong',
        status: 400
      })
    }
  }
}
