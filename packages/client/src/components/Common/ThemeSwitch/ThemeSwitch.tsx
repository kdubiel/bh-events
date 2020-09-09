import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from 'features/CustomThemeProvider';
import { RootState } from 'app/rootReducer';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import FlashOffIcon from '@material-ui/icons/FlashOff';
import { IconButton } from '@material-ui/core';

export const ThemeSwitch = () => {
  const dispatch = useDispatch();
  const { current } = useSelector((state: RootState) => state.theme);

  const handleClick = () => {
    dispatch(changeTheme(current === 'light' ? 'dark' : 'light'));
  };

  return (
    <IconButton
      color="inherit"
      aria-hidden={true}
      component="span"
      onClick={handleClick}
    >
      {current === 'light' ? <FlashOffIcon /> : <FlashOnIcon />}
    </IconButton>
  );
};
