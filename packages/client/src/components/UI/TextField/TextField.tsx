import {
  TextField as TextInput,
  TextFieldProps as MaterialTextFieldProps,
} from '@material-ui/core';
import React from 'react';

export type TextFieldProps = MaterialTextFieldProps;

export const TextField = (props: TextFieldProps) => {
  return <TextInput {...props} />;
};
