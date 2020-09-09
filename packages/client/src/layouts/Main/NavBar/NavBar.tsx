import { AppBar, Container, Toolbar, Box } from '@material-ui/core';
import DateRange from '@material-ui/icons/DateRange';
import React from 'react';
import Styled from './styled';
import { Flex, ThemeSwitch } from 'components';

export const NavBar = () => {
  return (
    <AppBar component="nav" color="default">
      <Toolbar>
        <Container maxWidth="lg">
          <Flex.Container>
            <Styled.HeaderLink to="/" aria-hidden={true}>
              <DateRange />
            </Styled.HeaderLink>
            <Flex.Grow />
            <Box m={1}>
              <ThemeSwitch />
            </Box>
            <Styled.LanguageSelect />
          </Flex.Container>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
