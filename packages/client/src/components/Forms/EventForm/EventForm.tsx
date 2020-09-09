import { Grid } from '@material-ui/core';
import { FormikDatePicker, FormikTextField } from 'components';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const EventForm = () => {
  const { t } = useTranslation();

  return (
    <Grid container justify="center" spacing={1}>
      <Grid item xs={12}>
        <FormikTextField
          size="small"
          type="text"
          variant="outlined"
          required
          fullWidth
          label={t('common:labels.title')}
          id="title"
          name="title"
        />
      </Grid>
      <Grid item xs={12}>
        <FormikDatePicker
          size="small"
          required
          fullWidth
          label={t('common:labels.date')}
          id="date"
          name="date"
          inputVariant="outlined"
        />
      </Grid>
    </Grid>
  );
};
