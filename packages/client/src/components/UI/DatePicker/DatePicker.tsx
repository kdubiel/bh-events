import React from 'react';
import {
  DatePicker as MaterialDatePicker,
  DatePickerProps as MaterialDatePickerProps,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { useTranslation } from 'react-i18next';

export interface DatePickerProps extends MaterialDatePickerProps {}

export const DatePicker = ({
  format = 'DD-MM-YYYY',
  okLabel,
  cancelLabel,
  ...restProps
}: DatePickerProps) => {
  const { i18n, t } = useTranslation();

  return (
    <MuiPickersUtilsProvider utils={MomentUtils} locale={i18n.language}>
      <MaterialDatePicker
        format={format}
        okLabel={okLabel || t('common:buttons.ok')}
        cancelLabel={cancelLabel || t('common:buttons.cancel')}
        {...restProps}
      />
    </MuiPickersUtilsProvider>
  );
};
