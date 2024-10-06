import {
  orderSlice,
  IOrderSlice,
  fetchOrder,
  getOrders,
  getOrderByNumber
} from './order-slice';
import { TOrder } from '@utils-types';

describe('test orderSlice', () => {
  let initialState: IOrderSlice = {
    orders: [],
    order: null,
    isLoading: false,
    error: undefined
  };

  describe('test fetchOrder action', () => {
    it('test fetchOrder pending', () => {
      const pendingAction = { type: fetchOrder.pending.type };
      const state = orderSlice.reducer(initialState, pendingAction);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeUndefined();
    });

    it('test fetchOrder fulfield', () => {
      const order: TOrder = {
        _id: '66dc004d119d45001b504b85',
        status: 'done',
        name: 'Био-марсианский флюоресцентный люминесцентный метеоритный бургер',
        createdAt: '2024-09-07T07:27:09.594Z',
        updatedAt: '2024-09-07T07:27:10.109Z',
        number: 52184,
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0940',
          '643d69a5c3f7b9001cfa093d'
        ]
      };

      const fulfieldAction = {
        type: fetchOrder.fulfilled.type,
        payload: { order }
      };

      const state = orderSlice.reducer(initialState, fulfieldAction);

      expect(state.isLoading).toBe(false);
      expect(state.order).toEqual(order);
      expect(state.error).toBeUndefined();
    });

    it('test fetchOrder rejected', () => {
      const errorAction = {
        type: fetchOrder.rejected.type,
        error: { message: 'test message error' }
      };

      const state = orderSlice.reducer(initialState, errorAction);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('test message error');
    });
  });

  describe('getOrders action', () => {
    it('test getOrders pending', () => {
      const pendingAction = { type: getOrders.pending.type };
      const state = orderSlice.reducer(initialState, pendingAction);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeUndefined();
    });

    it('test getOrders fulfield', () => {
      const orders: TOrder[] = [
        {
          _id: '66dc004d119d45001b504b85',
          status: 'done',
          name: 'Био-марсианский флюоресцентный люминесцентный метеоритный бургер',
          createdAt: '2024-09-07T07:27:09.594Z',
          updatedAt: '2024-09-07T07:27:10.109Z',
          number: 52184,
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa0940',
            '643d69a5c3f7b9001cfa093d'
          ]
        }
      ];

      const fulfieldAction = {
        type: getOrders.fulfilled.type,
        payload: orders
      };

      const state = orderSlice.reducer(initialState, fulfieldAction);

      expect(state.isLoading).toBe(false);
      expect(state.orders).toEqual(orders);
      expect(state.error).toBeUndefined();
    });

    it('test getOrders rejected', () => {
      const errorAction = {
        type: getOrders.rejected.type,
        error: { message: 'test message error' }
      };

      const state = orderSlice.reducer(initialState, errorAction);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('test message error');
    });
  });

  describe('getOrderByNumber action', () => {
    it('test getOrderByNumber pending', () => {
      const pendingAction = { type: getOrderByNumber.pending.type };
      const state = orderSlice.reducer(initialState, pendingAction);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeUndefined();
    });

    it('test getOrderByNumber fulfield', () => {
      const ordersReply = {
        success: true,
        orders: [
          {
            _id: '66dc004d119d45001b504b85',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa0941',
              '643d69a5c3f7b9001cfa0940',
              '643d69a5c3f7b9001cfa093d'
            ],
            status: 'done',
            name: 'Био-марсианский флюоресцентный люминесцентный метеоритный бургер',
            createdAt: '2024-09-07T07:27:09.594Z',
            updatedAt: '2024-09-07T07:27:10.109Z',
            number: 52184
          }
        ]
      };

      const fulfieldAction = {
        type: getOrderByNumber.fulfilled.type,
        payload: ordersReply
      };

      const state = orderSlice.reducer(initialState, fulfieldAction);

      expect(state.isLoading).toBe(false);
      expect(state.order).toEqual(ordersReply.orders[0]);
      expect(state.error).toBeUndefined();
    });

    it('test getOrderByNumber rejected', () => {
      const errorAction = {
        type: getOrderByNumber.rejected.type,
        error: { message: 'test message error' }
      };

      const state = orderSlice.reducer(initialState, errorAction);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('test message error');
    });
  });
});
