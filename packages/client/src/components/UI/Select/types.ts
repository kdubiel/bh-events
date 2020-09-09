import { SelectProps as MuiSelectProps } from '@material-ui/core';

interface SelectOption {
  label: string;
  value: string | number;
}

export interface SelectProps
  extends Omit<MuiSelectProps, 'input' | 'label' | 'labelWidth' | 'margin'> {
  options: SelectOption[];
  label: string;
  addEmptyValue?: boolean;
  helperText?: string | null;
  error?: boolean;
  margin?: 'none' | 'dense' | 'normal';
  id: string;
}
