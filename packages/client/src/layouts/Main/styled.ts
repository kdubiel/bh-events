import styled from 'styled-components';
import { ContainerProps, Container as MuiContainer } from '@material-ui/core';

const Container = styled(MuiContainer)<ContainerProps>`
  min-height: 100%;
  width: 100%;

  background-color: ${props => props.theme.palette.background.paper};

  padding-top: ${props => props.theme.spacing(2) + 56}px;
  padding-bottom: ${props => props.theme.spacing(4)}px;
  ${props => props.theme.breakpoints.up('sm')} {
    padding-top: ${props => props.theme.spacing(2) + 64}px;
  }
`;

export default {
  Container,
};
