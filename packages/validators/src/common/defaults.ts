import * as yup from 'yup';

export const DefaultString = () => yup.string().trim().min(3).max(64);

export const DefaultEmail = () => yup.string().trim().email().min(6).max(320);
