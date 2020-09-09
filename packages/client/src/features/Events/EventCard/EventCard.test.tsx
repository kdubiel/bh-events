import React from 'react';
import { EventCard } from './EventCard';
import { Event } from '@project/types';
import { render, screen } from 'test-utils';

const mockEvent: Event = {
  _id: '12345',
  title: 'TestEvent#1',
  date: new Date(1993, 10, 18),
  user: {
    firstName: 'Kamil',
    lastName: 'Dubiel',
    email: 'kamdubdev@gmail.com',
  },
};

describe('<EventCard />', () => {
  beforeEach(() => {
    render(<EventCard event={mockEvent} />);
  });

  it('should render title', async () => {
    const title = await screen.findByText(mockEvent.title);

    expect(title).toBeInTheDocument();
  });

  it('should render user data', async () => {
    const {
      user: { firstName, lastName, email },
    } = mockEvent;

    const userData = await screen.findByText(
      `${firstName} ${lastName} (${email})`
    );

    expect(userData).toBeInTheDocument();
  });

  it('should render date in correct format', async () => {
    const date = await screen.findByText(`18.11.1993`);

    expect(date).toBeInTheDocument();
  });
});
