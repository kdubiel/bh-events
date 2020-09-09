import React from 'react';
import { render } from 'test-utils';
import { Events } from 'pages';

describe('<Events />', () => {
  it('renders AddEvent component', async () => {
    const { findByTestId } = render(<Events />);

    expect(await findByTestId('add-event')).toBeInTheDocument();
  });

  it('renders EventsList component', async () => {
    const { findByTestId } = render(<Events />);

    expect(await findByTestId('events-list')).toBeInTheDocument();
  });
});
