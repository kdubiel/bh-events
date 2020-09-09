import i18n from './i18n';
import { ErrorBoundary } from 'components';
import { CustomThemeProvider } from 'features/CustomThemeProvider';
import React from 'react';
import { CustomLocaleProvider } from 'features/CustomLocalesProvider';
import { Router } from './Router';

function App() {
  return (
    <ErrorBoundary>
      <CustomLocaleProvider i18n={i18n}>
        <CustomThemeProvider>
          <Router />
        </CustomThemeProvider>
      </CustomLocaleProvider>
    </ErrorBoundary>
  );
}

export default App;
