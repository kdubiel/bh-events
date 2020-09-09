import { NavBar } from './NavBar';
import React, { ReactNode } from 'react';
import Styled from './styled';

interface Props {
  children: ReactNode;
}

export const Main = ({ children }: Props) => {
  return (
    <>
      <NavBar />
      <Styled.Container maxWidth="lg">
        <main>{children}</main>
      </Styled.Container>
    </>
  );
};
