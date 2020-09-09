import React from 'react';
import { EventsList, AddEvent } from 'features/Events';
import { Grid } from '@material-ui/core';

const Events = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} component="section">
        <AddEvent />
      </Grid>
      <Grid item xs={12} component="section">
        <EventsList />
      </Grid>
    </Grid>
  );
};

export default Events;
