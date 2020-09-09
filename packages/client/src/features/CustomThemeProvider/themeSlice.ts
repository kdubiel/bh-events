import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomTheme } from 'types';

export interface ThemeState {
  current: CustomTheme;
}

const themeInitialState: ThemeState = {
  current: 'dark',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: themeInitialState,
  reducers: {
    changeTheme: (state, { payload }: PayloadAction<CustomTheme>) => {
      state.current = payload;
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export const themeReducer = themeSlice.reducer;
