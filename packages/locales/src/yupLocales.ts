// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { setLocale } from 'yup';

export const initializeYupLocales = () =>
  setLocale({
    mixed: {
      default: () => ({ key: 'yup:mixed:default' }),
      required: () => ({ key: 'yup:mixed:required' }),
      oneOf: () => ({ key: 'yup:mixed:oneof' }),
      notOneOf: () => ({ key: 'yup:mixed:notoneof' }),
    },
    string: {
      length: ({ length }) => ({
        key: 'yup:string:length',
        values: { length },
      }),
      min: ({ min }) => ({ key: 'yup:string:min', values: { min } }),
      max: ({ max }) => ({ key: 'yup:string:max', values: { max } }),
      matches: ({ regex }) => ({
        key: 'yup:string:matches',
        values: { regex },
      }),
      email: ({ regex }) => ({
        key: 'yup:string:email',
        values: { regex },
      }),
      url: ({ regex }) => ({ key: 'yup:string:url', values: { regex } }),
      trim: () => ({ key: 'yup:string:trim' }),
      lowercase: () => ({ key: 'yup:string:lowercase' }),
      uppercase: () => ({ key: 'yup:string:uppercase' }),
    },
    number: {
      min: ({ min }) => ({ key: 'yup:number:min', values: { min } }),
      max: ({ max }) => ({ key: 'yup:number:max', values: { max } }),
      lessThan: ({ less }) => ({
        key: 'yup:number:lessthan',
        values: { less },
      }),
      moreThan: ({ more }) => ({
        key: 'yup:number:morethan',
        values: { more },
      }),
      positive: ({ more }) => ({
        key: 'yup:number:positive',
        values: { more },
      }),
      negative: ({ less }) => ({
        key: 'yup:number:negative',
        values: { less },
      }),
      integer: () => ({ key: 'yup:number:integer' }),
    },
    date: {
      min: ({ min }) => ({
        key: 'yup:date:min',
        values: { min: new Date(min).toLocaleDateString() },
      }),
      max: ({ max }) => ({
        key: 'yup:date:max',
        values: { max: new Date(max).toLocaleDateString() },
      }),
    },
    object: {
      noUnknown: () => ({ key: 'yup:object:nounknown' }),
    },
    array: {
      min: ({ min }) => ({ key: 'yup:array:min', values: { min } }),
      max: ({ max }) => ({ key: 'yup:array:max', values: { max } }),
    },
  });
