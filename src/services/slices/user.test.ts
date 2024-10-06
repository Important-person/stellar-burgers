import {
  userSlice,
  IUserState,
  registerUser,
  loginUser,
  getUser,
  updateUser,
  logout
} from './user-slice';
import { TUser } from '@utils-types';

describe('userSlice test', () => {
  let initialState: IUserState = {
    isAuthChecked: false,
    isAuthenticated: false,
    user: null,
    error: undefined
  };

  describe('registerUser action', () => {
    it('test registerUser pending', () => {
      const pendingAction = { type: registerUser.pending.type };
      const state = userSlice.reducer(initialState, pendingAction);

      expect(state.isAuthChecked).toBe(false);
      expect(state.isAuthenticated).toBe(false);
      expect(state.error).toBeUndefined();
    });

    it('test registerUser fulfield', () => {
      const user: TUser = {
        email: 'test@gmail.com',
        name: 'testPassword'
      };

      const fulfieldAction = {
        type: registerUser.fulfilled.type,
        payload: { user }
      };

      const state = userSlice.reducer(initialState, fulfieldAction);

      expect(state.isAuthChecked).toBe(true);
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(user);
      expect(state.error).toBeUndefined();
    });

    it('test registerUser rejected', () => {
      const errorAction = {
        type: registerUser.rejected.type,
        error: { message: 'test message error' }
      };

      const state = userSlice.reducer(initialState, errorAction);

      expect(state.isAuthChecked).toBe(true);
      expect(state.isAuthenticated).toBe(false);
      expect(state.error).toBe('test message error');
    });
  });

  describe('loginUser action', () => {
    it('test loginUser pending', () => {
      const pendingAction = { type: loginUser.pending.type };
      const state = userSlice.reducer(initialState, pendingAction);

      expect(state.isAuthChecked).toBe(false);
      expect(state.isAuthenticated).toBe(false);
      expect(state.error).toBeUndefined();
    });

    it('test loginUser fulfield', () => {
      const user: TUser = {
        email: 'test@gmail.com',
        name: 'testPassword'
      };

      const fulfieldAction = {
        type: loginUser.fulfilled.type,
        payload: user
      };

      const state = userSlice.reducer(initialState, fulfieldAction);

      expect(state.isAuthChecked).toBe(true);
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(user);
      expect(state.error).toBeUndefined();
    });

    it('test loginUser rejected', () => {
      const errorAction = {
        type: loginUser.rejected.type,
        error: { message: 'test message error' }
      };

      const state = userSlice.reducer(initialState, errorAction);

      expect(state.isAuthChecked).toBe(true);
      expect(state.isAuthenticated).toBe(false);
      expect(state.error).toBe('test message error');
    });
  });

  describe('getUser action', () => {
    it('test getUser pending', () => {
      const pendingAction = { type: getUser.pending.type };
      const state = userSlice.reducer(initialState, pendingAction);

      expect(state.isAuthChecked).toBe(false);
      expect(state.isAuthenticated).toBe(false);
      expect(state.error).toBeUndefined();
    });

    it('test getUser fulfield', () => {
      const user: TUser = {
        email: 'test@gmail.com',
        name: 'testPassword'
      };

      const fulfieldAction = {
        type: getUser.fulfilled.type,
        payload: { user }
      };

      const state = userSlice.reducer(initialState, fulfieldAction);

      expect(state.isAuthChecked).toBe(true);
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(user);
      expect(state.error).toBeUndefined();
    });

    it('test getUser rejected', () => {
      const errorAction = {
        type: getUser.rejected.type,
        error: { message: 'test message error' }
      };

      const state = userSlice.reducer(initialState, errorAction);

      expect(state.isAuthChecked).toBe(true);
      expect(state.isAuthenticated).toBe(false);
      expect(state.error).toBe('test message error');
    });
  });

  describe('updateUser action', () => {
    it('test updateUser pending', () => {
      const pendingAction = { type: updateUser.pending.type };
      const state = userSlice.reducer(initialState, pendingAction);

      expect(state.error).toBeUndefined();
    });

    it('test updateUser fulfield', () => {
      const user: TUser = {
        email: 'test@gmail.com',
        name: 'testPassword'
      };

      const fulfieldAction = {
        type: updateUser.fulfilled.type,
        payload: { user }
      };

      const state = userSlice.reducer(initialState, fulfieldAction);

      expect(state.user).toEqual(user);
      expect(state.error).toBeUndefined();
    });

    it('test updateUser rejected', () => {
      const errorAction = {
        type: updateUser.rejected.type,
        error: { message: 'test message error' }
      };

      const state = userSlice.reducer(initialState, errorAction);

      expect(state.error).toBe('test message error');
    });
  });

  describe('logout action', () => {
    it('test logout pending', () => {
      const pendingAction = { type: logout.pending.type };
      const state = userSlice.reducer(initialState, pendingAction);

      expect(state.error).toBeUndefined();
    });

    it('test logout fulfield', () => {
      const fulfieldAction = {
        type: logout.fulfilled.type
      };

      const state = userSlice.reducer(initialState, fulfieldAction);

      expect(state.isAuthenticated).toBe(false);
      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toBe(null);
    });

    it('test logout rejected', () => {
      const errorAction = {
        type: logout.rejected.type,
        error: { message: 'test message error' }
      };

      const state = userSlice.reducer(initialState, errorAction);

      expect(state.error).toBe('test message error');
    });
  });
});
