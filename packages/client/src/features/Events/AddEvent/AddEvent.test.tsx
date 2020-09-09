import { fireEvent, waitFor, within } from '@testing-library/dom';
import { AddEvent } from 'features/Events';
import moment from 'moment';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen } from 'test-utils';
import { API } from 'utils';

describe('<AddEvent />', () => {
  beforeEach(() => {
    render(<AddEvent />);
  });

  it('should render title', () => {
    expect(screen.getByText('events:add-event')).toBeInTheDocument();
  });

  it('should render form with event inputs and submit button', () => {
    const { getByLabelText, getByRole } = within(screen.getByRole('form'));

    expect(getByLabelText(/common:labels.title/i)).toBeInTheDocument();
    expect(getByLabelText(/common:labels.date/i)).toBeInTheDocument();
    expect(getByLabelText(/common:labels.first-name/i)).toBeInTheDocument();
    expect(getByLabelText(/common:labels.last-name/i)).toBeInTheDocument();
    expect(getByLabelText(/common:labels.email/i)).toBeInTheDocument();

    expect(getByRole('submit')).toBeInTheDocument();
  });

  it('should mark required fields with *', () => {
    expect(screen.getByText(/(common:labels.title)\s\*/i)).toBeInTheDocument();
    expect(screen.getByText(/(common:labels.date)\s\*/i)).toBeInTheDocument();
    expect(
      screen.getByText(/(common:labels.first-name)\s\*/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/(common:labels.last-name)\s\*/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/(common:labels.email)\s\*/i)).toBeInTheDocument();
  });

  it('should render server error message', async () => {
    render(<AddEvent />, {
      initialState: {
        events: {
          ids: [],
          entities: {},
          creatingError: 'ErrorMessage',
          loading: 'idle',
          creating: 'rejected',
        },
      },
    });

    expect(screen.getByText('ErrorMessage')).toBeInTheDocument();
  });

  describe('on validation errors', () => {
    it('should disable submit button', async () => {
      const button = screen.getByRole('submit');

      await act(async () => {
        await fireEvent.change(screen.getByLabelText(/common:labels.email/i), {
          target: { value: 'x' },
        });

        fireEvent.click(button);
      });

      expect(screen.getByRole('submit')).toBeDisabled();
    });

    it('should display required error message on required fields', async () => {
      const button = screen.getByRole('submit');

      await act(async () => {
        await fireEvent.change(screen.getByLabelText(/common:labels.title/i), {
          target: { value: '' },
        });
        await fireEvent.change(
          screen.getByLabelText(/common:labels.first-name/i),
          {
            target: { value: '' },
          }
        );
        await fireEvent.change(
          screen.getByLabelText(/common:labels.last-name/i),
          {
            target: { value: '' },
          }
        );
        await fireEvent.change(screen.getByLabelText(/common:labels.email/i), {
          target: { value: '' },
        });

        fireEvent.click(button);
      });

      expect(screen.getAllByText('yup:mixed.required')).toHaveLength(4);
    });

    it('should display incorrect email addres error message', async () => {
      const button = screen.getByRole('submit');

      await act(async () => {
        await fireEvent.change(screen.getByLabelText(/common:labels.email/i), {
          target: { value: 'kd@op' },
        });

        fireEvent.click(button);
      });

      expect(screen.getByText(/yup:string.email/i)).toBeInTheDocument();
    });

    it('should display string too long error messages in over 64 character strings', async () => {
      const button = screen.getByRole('submit');

      await act(async () => {
        await fireEvent.change(screen.getByLabelText(/common:labels.title/i), {
          target: { value: 'x'.repeat(65) },
        });
        await fireEvent.change(
          screen.getByLabelText(/common:labels.first-name/i),
          {
            target: { value: 'x'.repeat(65) },
          }
        );
        await fireEvent.change(
          screen.getByLabelText(/common:labels.last-name/i),
          {
            target: { value: 'x'.repeat(65) },
          }
        );

        fireEvent.click(button);
      });

      expect(screen.getAllByText('yup:string.max')).toHaveLength(3);
    });

    it('should display email too long error if it has over 320 characters', async () => {
      const button = screen.getByRole('submit');

      await act(async () => {
        await fireEvent.change(screen.getByLabelText(/common:labels.email/i), {
          target: { value: `${'x'.repeat(317)}@p.l` },
        });

        fireEvent.click(button);
      });

      expect(screen.getByText('yup:string.max')).toBeInTheDocument();
    });

    it('should display email too short if it has under 6 characters', async () => {
      const button = screen.getByRole('submit');

      await act(async () => {
        await fireEvent.change(screen.getByLabelText(/common:labels.email/i), {
          target: { value: 'k@p.l' },
        });

        fireEvent.click(button);
      });

      expect(screen.getByText('yup:string.min')).toBeInTheDocument();
    });
  });

  describe('on successfull validation', () => {
    it('should post form data on submit', async () => {
      const button = screen.getByRole('submit');

      const spy = jest.spyOn(API, 'post');

      const testData = {
        title: 'Test title',
        date: moment().startOf('day').toDate(),
        user: {
          firstName: 'Jan',
          lastName: 'Kowalski',
          email: 'jan.kowalski@test.com',
        },
      };

      await act(async () => {
        await fireEvent.change(screen.getByLabelText(/common:labels.title/i), {
          target: { value: testData.title },
        });
        await fireEvent.change(screen.getByLabelText(/common:labels.date/i), {
          target: { value: testData.date },
        });
        await fireEvent.change(
          screen.getByLabelText(/common:labels.first-name/i),
          {
            target: { value: testData.user.firstName },
          }
        );
        await fireEvent.change(
          screen.getByLabelText(/common:labels.last-name/i),
          {
            target: { value: testData.user.lastName },
          }
        );
        await fireEvent.change(screen.getByLabelText(/common:labels.email/i), {
          target: { value: testData.user.email },
        });

        fireEvent.click(button);
      });

      await waitFor(() => {
        expect(API.post).toBeCalledWith('events', {
          data: testData,
        });
      });

      spy.mockRestore();
    });

    it('should set loading state on button', async () => {
      const button = screen.getByRole('submit');

      const testData = {
        title: 'Test title',
        date: moment().startOf('day').toDate(),
        user: {
          firstName: 'Jan',
          lastName: 'Kowalski',
          email: 'jan.kowalski@test.com',
        },
      };

      await act(async () => {
        await fireEvent.change(screen.getByLabelText(/common:labels.title/i), {
          target: { value: testData.title },
        });
        await fireEvent.change(screen.getByLabelText(/common:labels.date/i), {
          target: { value: testData.date },
        });
        await fireEvent.change(
          screen.getByLabelText(/common:labels.first-name/i),
          {
            target: { value: testData.user.firstName },
          }
        );
        await fireEvent.change(
          screen.getByLabelText(/common:labels.last-name/i),
          {
            target: { value: testData.user.lastName },
          }
        );
        await fireEvent.change(screen.getByLabelText(/common:labels.email/i), {
          target: { value: testData.user.email },
        });

        fireEvent.click(button);
      });

      await waitFor(() => {
        expect(screen.getByTestId('button-loader')).toBeInTheDocument();
      });
    });
  });
});
