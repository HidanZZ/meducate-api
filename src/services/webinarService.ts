import { ClientSession, ObjectId } from 'mongoose';

import { Webinar } from '@/models';
import { CreateWebinarPayload, UpdateWebinarPayload } from '@/contracts/webinar';

export const webinarService = {
    getById: (webinarId: ObjectId) => Webinar.findById(webinarId),

    create: (
        {
        title,
        date,
        start_time,
        end_time,
        speaker
        }: CreateWebinarPayload,
        session?: ClientSession
    ) =>
        new Webinar({
        title,
        date,
        start_time,
        end_time,
        speaker
        }).save({ session }),
        

    updateById: (
        webinarId: ObjectId,
        { id }: UpdateWebinarPayload,
        session?: ClientSession
    ) => {
        const data = [{ _id: webinarId }, { id }];

        let params = null;

        if (session) {
        params = [...data, { session }];
        } else {
        params = data;
        }

        return Webinar.updateOne(...params);
    },

    deleteById: (webinarId: ObjectId, session?: ClientSession) =>
        Webinar.deleteOne({ _id: webinarId }, { session })
};
