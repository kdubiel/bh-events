import { render, RenderOptions } from '@testing-library/react';
import rootReducer, { RootState } from 'app/rootReducer';
import { CustomLocaleProvider } from 'features/CustomLocalesProvider';
import { CustomThemeProvider } from 'features/CustomThemeProvider';
import i18next from 'i18next';
import React, { ComponentType } from 'react';
import { initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

i18next.use(initReactI18next).init({
  debug: false,
  lng: 'en',
  resources: {},
  react: {
    bindI18n: 'languageChanged',
  },
  appendNamespaceToMissingKey: true,
});

interface Props {
  children: React.ReactNode;
}

const customRender = (
  ui: React.ReactElement,
  {
    initialState = {},
    ...renderOptions
  }: {
    initialState?: Partial<RootState>;
  } & Omit<RenderOptions, 'queries'> = {}
) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });

  const AllTheProviders = ({ children }: Props) => {
    return (
      <Provider store={store}>
        <CustomLocaleProvider i18n={i18next}>
          <CustomThemeProvider>{children}</CustomThemeProvider>
        </CustomLocaleProvider>
      </Provider>
    );
  };

  return render(ui, {
    wrapper: AllTheProviders as ComponentType,
    ...renderOptions,
  });
};

export * from '@testing-library/react';
export { customRender as render };
