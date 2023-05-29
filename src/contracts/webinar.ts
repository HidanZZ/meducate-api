import { Model, ObjectId } from 'mongoose'

export interface IWebinar {
    id: ObjectId;
    title: string;
    date: string;
    start_time: string;
    end_time: string;
    speaker: {
      id: number;
      firstName: string;
      lastName: string;
      picture: string;
      company: string;
      jobTitle: string;
      description: string;
    };
}
  
  

export type CreateWebinarPayload = Omit<IWebinar, 'id'>;

export type UpdateWebinarPayload = Pick<IWebinar, 'id' >

export type WebinarModel = Model<IWebinar>
