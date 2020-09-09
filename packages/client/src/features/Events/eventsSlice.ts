import { Event } from '@project/types';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { RootState } from 'app/rootReducer';
import { LoadingStatus } from 'types';
import { API } from 'utils';

export interface EventsState {
  loading: LoadingStatus;
  loadingError?: string | null;
  creating: LoadingStatus;
  creatingError?: string | null;
}

const eventsInitialState: EventsState = {
  loading: 'idle',
  loadingError: null,
  creating: 'idle',
  creatingError: null,
};

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  try {
    const { data } = await API.get<Event[]>('events');
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
});

export const createEvent = createAsyncThunk<Event, Omit<Event, '_id'>>(
  'events/createEvent',
  async event => {
    try {
      const { data } = await API.post<Event>('events', { data: event });
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

const eventsAdapter = createEntityAdapter<Event>({
  selectId: ({ _id }) => _id,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const eventsSlice = createSlice({
  name: 'events',
  initialState: eventsAdapter.getInitialState<EventsState>(eventsInitialState),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchEvents.pending, state => {
      state.loading = 'pending';
    });
    builder.addCase(fetchEvents.fulfilled, (state, { payload }) => {
      state.loading = 'fulfilled';
      state.loadingError = null;
      eventsAdapter.upsertMany(state, payload);
    });
    builder.addCase(fetchEvents.rejected, (state, { error }) => {
      state.loading = 'rejected';
      state.loadingError = error.message;
    });
    builder.addCase(createEvent.pending, state => {
      state.creating = 'pending';
    });
    builder.addCase(createEvent.fulfilled, (state, { payload }) => {
      state.creating = 'fulfilled';
      state.creatingError = null;
      eventsAdapter.addOne(state, payload);
    });
    builder.addCase(createEvent.rejected, (state, { error }) => {
      state.creating = 'rejected';
      state.creatingError = error.message;
    });
  },
});

export const eventsReducer = eventsSlice.reducer;

export const eventsSelector = eventsAdapter.getSelectors<RootState>(
  state => state.events
);
