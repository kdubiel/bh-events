import React from 'react';
import { Event } from '@project/types';
import moment from 'moment';
import { Card, CardContent, Typography } from '@material-ui/core';

interface Props {
  event: Event;
}

export const EventCard = ({
  event: {
    title,
    date,
    user: { firstName, lastName, email },
  },
}: Props) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" noWrap gutterBottom>
          {title}
        </Typography>
        <Typography color="textSecondary" noWrap>
          {firstName} {lastName} ({email})
        </Typography>
        <Typography color="textSecondary">
          {moment(date).format('DD.MM.YYYY')}
        </Typography>
      </CardContent>
    </Card>
  );
};
