import { getFeedsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';

export const fetchFeed = createAsyncThunk('feed/getAll', async () =>
  getFeedsApi()
);

interface IFeedSlice {
  feed: TOrdersData;
  isLoading: boolean;
}

const initialState: IFeedSlice = {
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isLoading: false
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFeed.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        (state.isLoading = false), (state.feed = action.payload);
      });
  },
  selectors: {
    ordersSelected: (state) => state.feed.orders,
    feedSelected: (state) => state.feed,
    isLoadingSelected: (state) => state.isLoading
  }
});

export const { ordersSelected, isLoadingSelected, feedSelected } =
  feedSlice.selectors;

export default feedSlice.reducer;
