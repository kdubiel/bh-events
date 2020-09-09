import FormHelperText from '@material-ui/core/FormHelperText';
import React, { useState, useRef, useEffect } from 'react';
import Styled from './styled';
import { SelectProps } from './types';
import { InputLabel, MenuItem, Select as MuiSelect } from '@material-ui/core';

export const Select = ({
  options,
  id,
  labelId,
  label,
  error,
  addEmptyValue,
  fullWidth,
  helperText,
  required,
  variant,
  margin,
  ...otherProps
}: SelectProps) => {
  const label_id = labelId || `${id}-label`;
  const inputLabel = useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    if (inputLabel.current) {
      setLabelWidth(inputLabel.current.clientWidth);
    }
  }, [inputLabel, label]);
  return (
    <Styled.FormControl
      fullWidth={fullWidth}
      error={error}
      required={required}
      variant={variant}
      margin={margin}
    >
      <InputLabel ref={inputLabel} id={label_id}>
        {label}
      </InputLabel>
      <MuiSelect
        id={id}
        labelId={label_id}
        fullWidth={fullWidth}
        variant={variant}
        labelWidth={labelWidth}
        {...otherProps}
      >
        {addEmptyValue && <MenuItem value=""></MenuItem>}
        {options.map(({ label, value }, idx) => (
          <MenuItem value={value} key={`${label}_${value}_${idx}`}>
            {label}
          </MenuItem>
        ))}
      </MuiSelect>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </Styled.FormControl>
  );
};
