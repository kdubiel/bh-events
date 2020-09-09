import * as MaterialButton from '@material-ui/core/Button';
import styled from 'styled-components';
import CircularProgress, {
  CircularProgressProps,
} from '@material-ui/core/CircularProgress';
import { ButtonProps } from './types';

const Button = styled(MaterialButton.default)<ButtonProps>``;

const Button__Text = styled.span<Pick<ButtonProps, 'isLoading'>>`
  visibility: ${props => (props.isLoading ? 'hidden' : 'visible')};
  display: inline-flex;
  vertical-align: middle;
`;

const Button__Loader = styled(CircularProgress)<
  Pick<ButtonProps, 'isLoading'> & CircularProgressProps
>`
  position: absolute;
`;

export const Styled = {
  Button,
  Button__Text,
  Button__Loader,
};
