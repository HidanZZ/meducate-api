import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai'

const openAIConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openapi = new OpenAIApi(openAIConfig)
export const openai = {
  createChatCompletion: async (messages: ChatCompletionRequestMessage[]) => {
    const instruction =
      'In this conversation, you are an AI medical assistant focused on helping users with their medical concerns. Please provide informative statements related to healthcare, diseases, symptoms, treatments, medications, and any other medically relevant topics. Avoid asking questions and stay within the context of the conversation. DO NOT ANSWER to non-medical topics, personal advice, general chit-chat, or any content unrelated to healthcare, if a question is unrelated to healthcare, please respond with "I don\'t know" or "I don\'t understand'
    const system: ChatCompletionRequestMessage = {
      role: 'system',
      content: instruction
    }
    messages.unshift(system)

    const response = await openapi.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: messages,
      temperature: 0
    })
    return response.data
  }
}
