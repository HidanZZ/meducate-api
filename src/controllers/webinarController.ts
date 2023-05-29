import { Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import winston from 'winston'

import { webinarService } from '@/services'
import { IContextRequest, IUserRequest } from '@/contracts/request'

export const webinarController = {
  createNewWebinar: async (
    req: IContextRequest<IUserRequest>,
    res: Response
  ) => {
    try {
      // Extract the necessary data from the request body
      const { title, date, start_time, end_time, speaker } = req.body

      // TODO: Add validation and error handling for the input data

      // Call the webinarService to create a new webinar
      const webinar = await webinarService.create({
        title,
        date,
        start_time,
        end_time,
        speaker
      })

      // Return the response
      return res.status(StatusCodes.OK).json({
        data: { id: webinar.id },
        message: ReasonPhrases.OK,
        status: StatusCodes.OK
      })
    } catch (error) {
      // Handle the error and log it
      winston.error(error)

      // Return an error response
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST
      })
    }
  },
}
