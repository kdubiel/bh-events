import { User } from '@project/types';
import { DefaultString, DefaultEmail } from '../common';
import * as yup from 'yup';

export const BaseUserFormSchema = () =>
  yup.object().shape<User>({
    firstName: DefaultString().required(),
    lastName: DefaultString().required(),
    email: DefaultEmail().required(),
  });
