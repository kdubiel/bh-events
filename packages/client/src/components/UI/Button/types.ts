import { ButtonProps as MuiButtonProps } from '@material-ui/core/Button';

export interface ButtonProps extends MuiButtonProps {
  isLoading?: boolean;
}
