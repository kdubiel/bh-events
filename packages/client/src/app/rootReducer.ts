import { combineReducers } from '@reduxjs/toolkit';
import { eventsReducer } from 'features/Events';
import { themeReducer } from 'features/CustomThemeProvider';

const rootReducer = combineReducers({
  events: eventsReducer,
  theme: themeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
