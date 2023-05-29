import { Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import winston from 'winston';

import { webinarService } from '@/services';
import { IContextRequest, IUserRequest } from '@/contracts/request';

export const webinarController = {
  createNewWebinar: async (
    req: IContextRequest<IUserRequest>,
    res: Response
  ) => {
    try {
      // Extract the necessary data from the request body
      const { title, date, start_time, end_time, speaker } = req.body;

      // TODO: Add validation and error handling for the input data

      // Call the webinarService to create a new webinar
      const webinar = await webinarService.create({
        title,
        date,
        start_time,
        end_time,
        speaker
      });

      // Return the response
      return res.status(StatusCodes.OK).json({
        data: { id: webinar._id },
        message: ReasonPhrases.OK,
        status: StatusCodes.OK
      });
    } catch (error) {
      // Handle the error and log it
      winston.error(error);

      // Return an error response
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST
      });
    }
  },

  editWebinar: async (
    req: IContextRequest<IUserRequest>,
    res: Response
  ) => {
    try {
      // Extract the necessary data from the request body
      const { webinarId } = req.params;
      const { title, date, start_time, end_time, speaker } = req.body;

      // TODO: Add validation and error handling for the input data

      // Call the webinarService to edit the webinar
      await webinarService.updateById(webinarId, {
        title,
        date,
        start_time,
        end_time,
        speaker
      });

      // Return the response
      return res.status(StatusCodes.OK).json({
        message: ReasonPhrases.OK,
        status: StatusCodes.OK
      });
    } catch (error) {
      // Handle the error and log it
      winston.error(error);

      // Return an error response
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST
      });
    }
  },

  deleteWebinar: async (
    req: IContextRequest<IUserRequest>,
    res: Response
  ) => {
    try {
      // Extract the webinar ID from the request parameters
      const { webinarId } = req.params;

      // TODO: Add validation and error handling for the webinar ID

      // Call the webinarService to delete the webinar
      await webinarService.deleteById(webinarId);

      // Return the response
      return res.status(StatusCodes.OK).json({
        message: ReasonPhrases.OK,
        status: StatusCodes.OK
      });
    } catch (error) {
      // Handle the error and log it
      winston.error(error);

      // Return an error response
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST
      });
    }
  }
};


