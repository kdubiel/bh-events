import { useFormikContext } from 'formik';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';

export const useTranslatedFormikError = (fieldName: string) => {
  const { t } = useTranslation();
  const { errors } = useFormikContext();
  const { key, values } = get(errors, fieldName, {});
  const errorMessage = key ? t(key, values) : null;

  return errorMessage;
};
