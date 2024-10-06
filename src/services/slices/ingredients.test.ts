import {
  ingredientSlice,
  fetchIngredients,
  IIngredirntsSlice
} from './Ingredients-slice';
import { TIngredient } from '@utils-types';

describe('ingredientSlice test', () => {
  let initialState: IIngredirntsSlice = {
    ingredients: [],
    error: undefined,
    isLoading: false
  };

  it('test fetchIngredients pending', () => {
    const pendingAction = { type: fetchIngredients.pending.type };
    const state = ingredientSlice.reducer(initialState, pendingAction);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeUndefined();
  });

  it('test fetchIngredients fulfield', () => {
    const ingredients: TIngredient[] = [
      {
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
      },
      {
        _id: '643d69a5c3f7b9001cfa0942',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
      },
      {
        _id: '643d69a5c3f7b9001cfa0943',
        name: 'Соус фирменный Space Sauce',
        type: 'sauce',
        proteins: 50,
        fat: 22,
        carbohydrates: 11,
        calories: 14,
        price: 80,
        image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
      }
    ];

    const fulfilledAction = {
      type: fetchIngredients.fulfilled.type,
      payload: ingredients
    };

    const state = ingredientSlice.reducer(initialState, fulfilledAction);

    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(ingredients);
    expect(state.error).toBeUndefined();
  });

  it('test fetchIngredients rejected', () => {
    const errorAction = {
      type: fetchIngredients.rejected.type,
      error: { message: 'test message error' }
    };

    const state = ingredientSlice.reducer(initialState, errorAction);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('test message error');
  });
});
