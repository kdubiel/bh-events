import React from 'react';
import { DatePicker, DatePickerProps } from 'components';
import { useField, useFormikContext } from 'formik';
import { useTranslatedFormikError } from 'hooks';

interface Props extends Partial<DatePickerProps> {
  name: string;
}

export const FormikDatePicker = ({ name, helperText, ...restProps }: Props) => {
  const [field, { touched }] = useField(name);
  const { setFieldValue } = useFormikContext();
  const error = useTranslatedFormikError(name);

  return (
    <DatePicker
      {...restProps}
      {...field}
      error={!!error && touched}
      // ' ' is ok here because MUI FormHelperText changes it to &#8203;
      helperText={(touched && error) || helperText || ' '}
      onChange={value => setFieldValue(name, value)}
    />
  );
};
