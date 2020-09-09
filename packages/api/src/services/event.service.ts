import { Event } from '@project/types';
import { EventModel } from 'models';
import { HttpException } from 'utils';

export class EventService {
  public getList = async () => {
    try {
      const events = await EventModel.find({}, 'title date user');

      return events;
    } catch (error) {
      throw new HttpException(error);
    }
  };

  public getOne = async (id: string) => {
    try {
      const event = await EventModel.findOne({ _id: id });

      return event;
    } catch (error) {
      throw new HttpException(error, 404, 'errors:event-not-found');
    }
  };

  public create = async (event: Event) => {
    try {
      const newEvent = await new EventModel(event).save();

      return newEvent;
    } catch (error) {
      throw new HttpException(error, 400);
    }
  };
}
