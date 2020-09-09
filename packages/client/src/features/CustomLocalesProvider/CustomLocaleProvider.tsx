import { initializeYupLocales } from '@project/locales';
import { i18n } from 'i18next';
import moment from 'moment';
import 'moment/locale/en-gb';
import 'moment/locale/pl';
import React, { ReactNode, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { momentLocaleMap, SupportedLanguage } from '@project/locales';

interface Props {
  children: ReactNode;
  i18n: i18n;
}

const handleMomentLocaleChange = (i18nLng: SupportedLanguage) => {
  moment.locale(momentLocaleMap[i18nLng]);
};

export const CustomLocaleProvider = ({ children, i18n }: Props) => {
  useEffect(() => {
    i18n.on('languageChanged', handleMomentLocaleChange);

    initializeYupLocales();

    return () => {
      i18n.off('languageChanged', handleMomentLocaleChange);
    };
  }, [i18n]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
