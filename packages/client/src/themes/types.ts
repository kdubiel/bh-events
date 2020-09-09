import { Theme } from '@material-ui/core';
import 'styled-components';

interface AdditionalProps {}

declare module '@material-ui/core/styles/createMuiTheme' {
  interface ThemeOptions extends AdditionalProps {}

  interface Theme extends AdditionalProps {}
}

declare module 'styled-components' {
  interface DefaultTheme extends AdditionalProps, Theme {}
}
