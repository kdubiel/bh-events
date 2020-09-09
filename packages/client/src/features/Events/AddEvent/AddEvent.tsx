import { Grid, Typography } from '@material-ui/core';
import { Event } from '@project/types';
import { BaseEventFormSchema } from '@project/validators';
import { RootState } from 'app/rootReducer';
import {
  Button,
  ErrorMessage,
  EventForm,
  FormikForm,
  UserForm,
} from 'components';
import { createEvent } from 'features/Events';
import { Formik } from 'formik';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

interface Props {}

const formModel: Omit<Event, '_id'> = {
  title: '',
  date: moment().startOf('day').toDate(),
  user: {
    firstName: '',
    lastName: '',
    email: '',
  },
};

export const AddEvent = (_props: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { creating, creatingError } = useSelector(
    (state: RootState) => state.events
  );

  const onSubmit = (data: typeof formModel) => {
    dispatch(createEvent(data));
  };

  return (
    <Grid container spacing={2} data-testid="add-event">
      <Grid item xs={12} component="header">
        <Typography variant="h5">{t('events:add-event')}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Formik
          initialValues={formModel}
          onSubmit={onSubmit}
          validationSchema={BaseEventFormSchema}
          enableReinitialize
        >
          {({ isValid }) => (
            <FormikForm
              noValidate
              aria-errormessage="add-event-form-error"
              name="add-event-form"
            >
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <EventForm />
                </Grid>
                <Grid item xs={12} md={6}>
                  <UserForm />
                </Grid>
                <Grid item container xs={12} justify="flex-end">
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    isLoading={creating === 'pending'}
                    disabled={!isValid}
                    role="submit"
                  >
                    {t('common:buttons.save')}
                  </Button>
                </Grid>
                <Grid item container xs={12} justify="flex-end">
                  {creatingError && (
                    <ErrorMessage id="add-event-form-error">
                      {creatingError}
                    </ErrorMessage>
                  )}
                </Grid>
              </Grid>
            </FormikForm>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};
