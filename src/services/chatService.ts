import { ClientSession } from 'mongoose'

import { Chat } from '@/models'
import { MessageType } from '@/contracts/chat'
import { ObjectId } from 'mongodb'

export const chatService = {
  getById: (id: string) => Chat.findById(new ObjectId(id)),
  create: (
    {
      title,
      description,
      lastMessage,
      messages,
      userId
    }: {
      title: string
      description: string
      lastMessage: MessageType
      messages: MessageType[]
      userId: string
    },
    session?: ClientSession
  ) =>
    Chat.create(
      [
        {
          title,
          description,
          lastMessage,
          messages,
          userId
        }
      ],
      { session }
    ),

  addMessageById: (
    {
      id,
      message
    }: {
      id: string
      message: MessageType
    },
    session?: ClientSession
  ) => {
    return Chat.updateOne(
      { _id: new ObjectId(id) },

      {
        $push: { messages: message },
        $set: { lastMessage: message }
      },
      { session }
    )
  },
  getChatsByUserId: (userId: string) => Chat.find({ userId })
}
