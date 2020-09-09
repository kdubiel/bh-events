import { supportedLanguages } from '@project/locales';
import { Select } from 'components';
import { map } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';

const languageOptions = map(supportedLanguages, (value, key) => ({
  label: value,
  value: key,
}));

export const LanguageSelect = () => {
  const { i18n, t } = useTranslation();

  const onChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    i18n.changeLanguage(event.target.value as keyof typeof supportedLanguages);
  };

  return (
    <Select
      aria-label="select language"
      variant="standard"
      margin="dense"
      color="primary"
      label={t('common:language')}
      options={languageOptions}
      value={
        i18n.language in supportedLanguages
          ? i18n.language
          : i18n.options.fallbackLng
      }
      onChange={onChange}
      id="languageSelect"
    />
  );
};
