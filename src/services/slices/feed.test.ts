import { feedSlice, IFeedSlice, fetchFeed } from './feed-slice';
import { TOrdersData } from '@utils-types';

describe('test feedSlice', () => {
  const initialState: IFeedSlice = {
    feed: {
      orders: [],
      total: 0,
      totalToday: 0
    },
    isLoading: false,
    error: undefined
  };

  it('test fetchFeed pending', () => {
    const pendingAction = { type: fetchFeed.pending.type };
    const state = feedSlice.reducer(initialState, pendingAction);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeUndefined();
  });

  it('test fetchFeed fulfield', () => {
    const feed: TOrdersData = {
      orders: [
        {
          _id: '66dbf9ba119d45001b504b6f',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa0940',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Био-марсианский флюоресцентный люминесцентный метеоритный бургер',
          createdAt: '2024-09-07T06:59:06.728Z',
          updatedAt: '2024-09-07T06:59:07.217Z',
          number: 52179
        }
      ],
      total: 1,
      totalToday: 1
    };

    const fulfilledAction = {
      type: fetchFeed.fulfilled.type,
      payload: feed
    };

    const state = feedSlice.reducer(initialState, fulfilledAction);

    expect(state.isLoading).toBe(false);
    expect(state.feed).toEqual(feed);
    expect(state.error).toBeUndefined();
  });

  it('test fetchFeed rejected', () => {
    const errorAction = {
      type: fetchFeed.rejected.type,
      error: { message: 'test message error' }
    };

    const state = feedSlice.reducer(initialState, errorAction);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('test message error');
  });
});
