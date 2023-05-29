import { Schema, model } from 'mongoose';

import { IWebinar, WebinarModel } from '@/contracts/webinar';

const schema = new Schema<IWebinar, WebinarModel>(
  {
    id: { type: Schema.Types.ObjectId },
    title: String,
    date: String,
    start_time: String,
    end_time: String,
    speaker: {
      id: Number,
      firstName: String,
      lastName: String,
      picture: String,
      company: String,
      jobTitle: String,
      description: String,
    },
  },
  { timestamps: true }
);

export const Webinar = model<IWebinar, WebinarModel>('Webinar', schema);
