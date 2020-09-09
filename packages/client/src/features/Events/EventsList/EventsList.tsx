import { Grid, Typography } from '@material-ui/core';
import { RootState } from 'app/rootReducer';
import { Loader } from 'components';
import { eventsSelector, fetchEvents } from 'features/Events/';
import { EventsGrid } from 'features/Events/EventsGrid';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

export const EventsList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const events = useSelector((state: RootState) =>
    eventsSelector.selectAll(state)
  );

  const { loading, loadingError } = useSelector(
    (state: RootState) => state.events
  );

  return (
    <Grid container spacing={2} data-testid="events-list">
      <Grid item xs={12} component="header">
        <Typography variant="h5" gutterBottom>
          {t('events:events-list')}
        </Typography>
      </Grid>
      {loading === 'pending' ? (
        <Grid item container xs={12} justify="center">
          <Loader />
        </Grid>
      ) : (
        <EventsGrid events={events} error={loadingError} />
      )}
    </Grid>
  );
};
