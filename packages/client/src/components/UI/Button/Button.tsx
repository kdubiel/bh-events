import React from 'react';
import { Styled } from './styled';
import { ButtonProps } from './types';

export const Button = ({
  children,
  isLoading,
  disabled,
  ...otherProps
}: ButtonProps) => {
  return (
    <Styled.Button {...otherProps} disabled={isLoading || disabled}>
      <Styled.Button__Text isLoading={isLoading}>
        {children}
      </Styled.Button__Text>
      {isLoading && (
        <Styled.Button__Loader
          color="inherit"
          disableShrink={true}
          size={24}
          data-testid="button-loader"
        />
      )}
    </Styled.Button>
  );
};
