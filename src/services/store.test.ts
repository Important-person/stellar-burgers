import { rootReducer } from './store';
import { ingredientSlice } from './slices/Ingredients-slice';
import { constructorSlice } from './slices/constructor-slice';
import { feedSlice } from './slices/feed-slice';
import { orderSlice } from './slices/order-slice';
import { userSlice } from './slices/user-slice';

describe('test storage initialisation', () => {
  it('all slices are initialised', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      [ingredientSlice.name]: ingredientSlice.getInitialState(),
      [constructorSlice.name]: constructorSlice.getInitialState(),
      [feedSlice.name]: feedSlice.getInitialState(),
      [orderSlice.name]: orderSlice.getInitialState(),
      [userSlice.name]: userSlice.getInitialState()
    });
  });
});
