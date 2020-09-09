import React from 'react';
import { EventsGrid } from './EventsGrid';
import { Event } from '@project/types';
import { render, screen } from 'test-utils';

const mockEvents: Event[] = [
  {
    _id: '12345',
    title: 'TestEvent#1',
    date: new Date(1993, 10, 18),
    user: {
      firstName: 'Kamil',
      lastName: 'Dubiel',
      email: 'kamdubdev@gmail.com',
    },
  },
  {
    _id: '67890',
    title: 'TestEvent#2',
    date: new Date(1993, 10, 18),
    user: {
      firstName: 'Kamil',
      lastName: 'Dubiel',
      email: 'kamdubdev@gmail.com',
    },
  },
];

describe('<EventsGrid />', () => {
  it('should render <NoData /> with error message if no events passed', async () => {
    render(<EventsGrid events={[]} error="testError" />);

    expect(screen.getByText('common:nodata')).toBeInTheDocument();
    expect(screen.getByText('testError')).toBeInTheDocument();
  });

  it('should render event cards', async () => {
    render(<EventsGrid events={mockEvents} />);

    expect(screen.getByText('TestEvent#1')).toBeInTheDocument();
    expect(screen.getByText('TestEvent#2')).toBeInTheDocument();
  });
});
