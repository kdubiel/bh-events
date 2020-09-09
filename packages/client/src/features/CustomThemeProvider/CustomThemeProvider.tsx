import {
  Theme,
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
  ThemeOptions,
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { StylesProvider } from '@material-ui/styles';
import { RootState } from 'app/rootReducer';
import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Dark, Light } from 'themes';
import { CustomTheme } from 'types';
import GlobalStyles from './globalStyles';
import * as locales from '@material-ui/core/locale';
import { useTranslation } from 'react-i18next';
import { SupportedLanguage, getMaterialLanguage } from '@project/locales';

type AvailableThemes = {
  [key in CustomTheme]: ThemeOptions;
};

const availableThemes: AvailableThemes = {
  light: Light,
  dark: Dark,
};

interface Props {
  children: ReactNode;
}

export const CustomThemeProvider = ({ children }: Props) => {
  const { i18n } = useTranslation();
  const { current } = useSelector((state: RootState) => state.theme);

  const materialLanguage = getMaterialLanguage(
    i18n.language as SupportedLanguage
  );

  const theme: Theme = createMuiTheme(
    availableThemes[current],
    locales[materialLanguage]
  );

  return (
    <>
      <GlobalStyles />
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </MuiThemeProvider>
      </StylesProvider>
    </>
  );
};
