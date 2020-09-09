import { waitFor } from '@testing-library/dom';
import React from 'react';
import { render, screen } from 'test-utils';
import { API } from 'utils';
import { EventsList } from './EventsList';

jest.mock('../../../utils/api.ts');
const mockedApi = API as jest.Mocked<typeof API>;

describe('<EventsList />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render heading', async () => {
    render(<EventsList />);

    expect(screen.getByText('events:events-list')).toBeInTheDocument();
  });

  it('should fetch events on mount', async () => {
    const spy = jest.spyOn(API, 'get');

    render(<EventsList />);

    await waitFor(() => {
      expect(screen.getByTestId('component-loader')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(API.get).toBeCalledWith('events');
    });

    spy.mockRestore();
  });

  it('should pass fetched events to <EventsGrid />', async () => {
    mockedApi.get.mockResolvedValue({
      data: [
        {
          _id: '12345',
          title: 'TestEvent#1',
          date: '1993-11-18T16:25:17.761Z',
          user: {
            firstName: 'Kamil',
            lastName: 'Dubiel',
            email: 'kamdubdev@gmail.com',
          },
        },
      ],
    });

    render(<EventsList />);

    await waitFor(() => {
      expect(screen.getByText('TestEvent#1')).toBeInTheDocument();
    });
  });

  it('should pass error message to <EventsGrid />', async () => {
    mockedApi.get.mockRejectedValue('Test Error');

    render(<EventsList />);

    await waitFor(() => {
      expect(screen.getByText('Test Error')).toBeInTheDocument();
    });
  });
});
