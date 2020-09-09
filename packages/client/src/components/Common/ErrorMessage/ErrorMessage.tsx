import React from 'react';
import { Typography, TypographyProps } from '@material-ui/core';

interface Props extends Omit<TypographyProps, 'variant, color'> {
  children: React.ReactNode;
}

export const ErrorMessage = ({ children }: Props) => {
  return (
    <Typography variant="body1" color="error">
      {children}
    </Typography>
  );
};
