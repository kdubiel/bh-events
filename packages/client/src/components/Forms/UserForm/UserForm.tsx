import { Grid } from '@material-ui/core';
import { FormikTextField } from 'components';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const UserForm = () => {
  const { t } = useTranslation();

  return (
    <Grid container justify="center" spacing={1}>
      <Grid item xs={12}>
        <FormikTextField
          size="small"
          type="text"
          variant="outlined"
          fullWidth
          required
          label={t('common:labels.first-name')}
          id="firstName"
          name="user.firstName"
        />
      </Grid>
      <Grid item xs={12}>
        <FormikTextField
          size="small"
          type="text"
          variant="outlined"
          fullWidth
          required
          label={t('common:labels.last-name')}
          id="lastName"
          name="user.lastName"
        />
      </Grid>
      <Grid item xs={12}>
        <FormikTextField
          size="small"
          type="text"
          variant="outlined"
          fullWidth
          required
          label={t('common:labels.email')}
          id="email"
          name="user.email"
        />
      </Grid>
    </Grid>
  );
};
