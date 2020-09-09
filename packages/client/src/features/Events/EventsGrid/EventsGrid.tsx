import { Grid } from '@material-ui/core';
import { Event } from '@project/types';
import { NoData } from 'components';
import { EventCard } from 'features/Events/EventCard';
import { isEmpty } from 'lodash';
import React from 'react';

interface Props {
  events: Event[];
  error?: string | null;
}

export const EventsGrid = ({ events, error }: Props) => {
  if (isEmpty(events)) {
    return (
      <Grid item xs={12}>
        <NoData showIcon error={error} />
      </Grid>
    );
  }

  return (
    <Grid item container xs={12} spacing={2}>
      {events.map(event => (
        <Grid key={event._id} item xs={12} sm={6} md={4} component="article">
          <EventCard event={event} />
        </Grid>
      ))}
    </Grid>
  );
};
