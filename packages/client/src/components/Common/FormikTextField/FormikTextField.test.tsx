import React from 'react';
import { render, screen } from 'test-utils';
import { FormikTextField } from './FormikTextField';
import { Formik } from 'formik';
import { fireEvent } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';

const mockSubmit = jest.fn(() => {});
const mockValidateFail = jest.fn(() => ({
  testField: { key: 'errorMessage' },
}));
const mockValidateSuccess = jest.fn(() => ({}));

describe('<FormikTextField />', () => {
  it('should correctly pass input value initially', async () => {
    render(
      <Formik
        initialValues={{ testField: 'testValue' }}
        onSubmit={mockSubmit}
        validate={mockValidateFail}
      >
        {() => (
          <form>
            <FormikTextField
              name="testField"
              id="testField"
              label="TestLabel"
              helperText="helperText"
            />
          </form>
        )}
      </Formik>
    );

    expect(await screen.findByDisplayValue('testValue')).toBeInTheDocument();
  });

  it('should call validate when touched', async () => {
    render(
      <Formik
        initialValues={{ testField: 'testValue' }}
        onSubmit={mockSubmit}
        validate={mockValidateFail}
      >
        {() => (
          <form>
            <FormikTextField
              name="testField"
              id="testField"
              label="TestLabel"
            />
          </form>
        )}
      </Formik>
    );

    const input = screen.getByLabelText('TestLabel');

    await act(async () => {
      fireEvent.blur(input);
    });

    expect(mockValidateFail).toBeCalledTimes(1);
  });

  it('should display helperText initially', async () => {
    render(
      <Formik
        initialValues={{ testField: 'testValue' }}
        onSubmit={mockSubmit}
        validate={mockValidateFail}
      >
        {() => (
          <form>
            <FormikTextField
              name="testField"
              id="testField"
              label="TestLabel"
              helperText="helperText"
            />
          </form>
        )}
      </Formik>
    );

    expect(await screen.findByText('helperText')).toBeInTheDocument();
  });

  it('should display error after touched and validation fails', async () => {
    render(
      <Formik
        initialValues={{ testField: 'testValue' }}
        onSubmit={mockSubmit}
        validate={mockValidateFail}
      >
        {() => (
          <form>
            <FormikTextField
              name="testField"
              id="testField"
              label="TestLabel"
              helperText="helperText"
            />
          </form>
        )}
      </Formik>
    );

    const input = screen.getByLabelText('TestLabel');

    expect(await screen.findByText('helperText')).toBeInTheDocument();

    await act(async () => {
      fireEvent.blur(input);
    });

    expect(await screen.queryByText('helperText')).toBeNull();
    expect(
      await screen.findByText('translation:errorMessage')
    ).toBeInTheDocument();
    expect(await screen.findByText('TestLabel')).toHaveClass('Mui-error');
  });

  it('should not display error when not touched', async () => {
    render(
      <Formik
        initialValues={{ testField: 'testValue' }}
        onSubmit={mockSubmit}
        validate={mockValidateFail}
      >
        {() => (
          <form>
            <FormikTextField
              name="testField"
              id="testField"
              label="TestLabel"
              helperText="helperText"
            />
          </form>
        )}
      </Formik>
    );

    expect(await screen.findByText('helperText')).toBeInTheDocument();
    expect(await screen.queryByText('translation:errorMessage')).toBeNull();
    expect(await screen.findByText('TestLabel')).not.toHaveClass('Mui-error');
  });

  it('should display helperText after validation passed', async () => {
    render(
      <Formik
        initialValues={{ testField: 'testValue' }}
        onSubmit={mockSubmit}
        validate={mockValidateSuccess}
      >
        {() => (
          <form>
            <FormikTextField
              name="testField"
              id="testField"
              label="TestLabel"
              helperText="helperText"
            />
          </form>
        )}
      </Formik>
    );

    const input = screen.getByLabelText('TestLabel');

    expect(await screen.findByText('helperText')).toBeInTheDocument();

    await act(async () => {
      fireEvent.blur(input);
    });

    expect(mockValidateSuccess).toBeCalledTimes(1);

    expect(await screen.findByText('helperText')).toBeInTheDocument();
    expect(await screen.queryByText('translation:errorMessage')).toBeNull();
    expect(await screen.findByText('TestLabel')).not.toHaveClass('Mui-error');
  });

  it('should display zero width space if no helperText or errorMessage provided', async () => {
    render(
      <Formik
        initialValues={{ testField: 'testValue' }}
        onSubmit={mockSubmit}
        validate={mockValidateSuccess}
      >
        {() => (
          <form>
            <FormikTextField
              name="testField"
              id="testField"
              label="TestLabel"
            />
          </form>
        )}
      </Formik>
    );

    expect(screen.getByText(/\u200B/u)).toBeInTheDocument();
  });
});
