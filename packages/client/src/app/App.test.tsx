import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import store from 'app/store';
import 'app/i18n';

test('App renders', () => {
  const app = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(app).toBeTruthy();
});
