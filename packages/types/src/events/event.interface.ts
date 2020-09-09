import { User } from '../user';

export interface Event {
  _id: string;
  title: string;
  date: Date;
  user: User;
}
