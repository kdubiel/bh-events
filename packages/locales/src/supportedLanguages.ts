export type SupportedLanguage = 'en' | 'pl';

export const supportedLanguages: { [key in SupportedLanguage]: string } = {
  en: 'English',
  pl: 'Polski',
};

export type SupportedMomentLanguage = 'pl' | 'en-gb';

export const momentLocaleMap: {
  [key in SupportedLanguage]: SupportedMomentLanguage;
} = {
  pl: 'pl',
  en: 'en-gb',
};

export type SupportedMaterialLanguage = 'plPL' | 'enUS';

export const materialLocaleMap: {
  [key in SupportedLanguage]: SupportedMaterialLanguage;
} = {
  pl: 'plPL',
  en: 'enUS',
};

export const getMaterialLanguage = (
  i18nLanguage: SupportedLanguage
): SupportedMaterialLanguage => {
  return materialLocaleMap[i18nLanguage] as SupportedMaterialLanguage;
};

export const getMomentLanguage = (
  i18nLanguage: SupportedLanguage
): SupportedMomentLanguage => {
  return momentLocaleMap[i18nLanguage] as SupportedMomentLanguage;
};
