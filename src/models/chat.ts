import { Schema, model } from 'mongoose'

import { IChat, ChatModel } from '@/contracts/chat'

const schema = new Schema<IChat, ChatModel>(
  {
    title: String,
    description: String,
    lastMessage: {
      senderId: String,
      message: String,
      time: String
    },
    messages: [
      {
        senderId: String,
        message: String,
        time: String
      }
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
)

export const Chat = model<IChat, ChatModel>('Chat', schema)
