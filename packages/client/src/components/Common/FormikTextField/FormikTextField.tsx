import { TextField, TextFieldProps } from 'components';
import { useField } from 'formik';
import React from 'react';
import { useTranslatedFormikError } from 'hooks';

interface Props {
  name: string;
}

export type FormikTextFieldProps = Props & TextFieldProps;

export const FormikTextField = ({
  name,
  helperText,
  ...restProps
}: FormikTextFieldProps) => {
  const [field, { touched }] = useField(name);
  const error = useTranslatedFormikError(name);

  return (
    <TextField
      {...restProps}
      inputProps={{ ...field }}
      error={!!error && touched}
      // ' ' is ok here because MUI FormHelperText changes it to &#8203;
      helperText={(touched && error) || helperText || ' '}
    />
  );
};
