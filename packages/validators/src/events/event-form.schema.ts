import { Event } from '@project/types';
import { DefaultString } from '../common';
import { BaseUserFormSchema } from '../user';
import * as yup from 'yup';

export const BaseEventFormSchema = () =>
  yup.object().shape<Omit<Event, '_id'>>({
    title: DefaultString().required(),
    date: yup.date().required(),
    user: BaseUserFormSchema().required(),
  });
