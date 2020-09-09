import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Box } from '@material-ui/core';
import VisibilityOffRoundedIcon from '@material-ui/icons/VisibilityOffRounded';
import { ErrorMessage } from 'components';

interface Props {
  showIcon?: boolean;
  error?: string | null;
}

export const NoData = ({ showIcon, error }: Props) => {
  const { t } = useTranslation();
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box display="flex" flexDirection="row" alignItems="center">
        {showIcon && (
          <>
            <VisibilityOffRoundedIcon fontSize="large" />
            &nbsp;
          </>
        )}
        <Typography>{t('common:nodata')}</Typography>
      </Box>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Box>
  );
};
