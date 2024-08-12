import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

export const fetchOrder = createAsyncThunk(
  'order/post',
  async (data: string[]) => orderBurgerApi(data)
);

export const getOrders = createAsyncThunk('orders/getAll', async () =>
  getOrdersApi()
);

export const getOrderByNumber = createAsyncThunk(
  'order/get',
  async (number: number) => getOrderByNumberApi(number)
);

interface IOrderSlice {
  orders: TOrder[];
  order: TOrder | null;
  isLoading: boolean;
}

const initialState: IOrderSlice = {
  orders: [],
  order: null,
  isLoading: false
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    removeBurger: (state) => {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrder.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        (state.isLoading = false), (state.order = action.payload.order);
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        (state.isLoading = false), (state.orders = action.payload);
        console.log(state.orders);
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderByNumber.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        (state.isLoading = false), (state.order = action.payload.orders[0]);
      });
  },
  selectors: {
    orderSelector: (state) => state.order,
    ordersSelector: (state) => state.orders,
    isLoadingSelector: (state) => state.isLoading
  }
});

export const { orderSelector, ordersSelector, isLoadingSelector } =
  orderSlice.selectors;

export const { removeBurger } = orderSlice.actions;

export default orderSlice.reducer;
