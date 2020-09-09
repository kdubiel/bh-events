import MaterialFormControl, {
  FormControlProps,
} from '@material-ui/core/FormControl';
import styled from 'styled-components';

const FormControl = styled(MaterialFormControl)<FormControlProps>`
  &.MuiFormControl-root {
    min-width: 120px;
  }
`;

export default {
  FormControl,
};
