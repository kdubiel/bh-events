import { Document, model, Model, Schema } from 'mongoose';
import { Event } from '@project/types';

export interface IEventSchema extends Event, Document {
  _id: string;
}

export interface EventModel extends Model<IEventSchema> {}

const EventSchema = new Schema<IEventSchema>(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    user: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
      },
    },
  },
  { timestamps: true }
);

export const EventModel = model<IEventSchema, EventModel>(
  'Event',
  EventSchema,
  'Events'
);
