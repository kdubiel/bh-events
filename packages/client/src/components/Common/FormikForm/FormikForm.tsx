import React, { useEffect } from 'react';
import { Form, FormikFormProps, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';

export const FormikForm = ({ children, ...restProps }: FormikFormProps) => {
  const { i18n } = useTranslation();
  const { validateForm } = useFormikContext();

  useEffect(() => {
    const validationHandler = () => {
      validateForm();
    };
    i18n.on('languageChanged', validationHandler);
    return () => {
      i18n.off('languageChanged', validationHandler);
    };
  }, [i18n, validateForm]);

  return <Form {...restProps}>{children}</Form>;
};
