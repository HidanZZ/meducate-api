import { Model, ObjectId } from 'mongoose'

export type MessagePayload = {
  message: string
  chatId: string | null
}

export type MessageType = {
  senderId: string
  message: string
  time: string
}

export interface IChat {
  id: string
  title: string
  lastMessage: MessageType
  description: string
  messages: MessageType[]
  userId: ObjectId
}
//omit userId,messages
export type ChatReponse = Omit<IChat, 'userId' | 'messages'>

export type ChatModel = Model<IChat>
