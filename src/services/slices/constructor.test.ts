import { TConstructorIngredient } from '@utils-types';
import {
  constructorSlice,
  addToBurger,
  IconstrustorSlise,
  removeIngredient,
  moveIngredient
} from './constructor-slice';

jest.mock('@reduxjs/toolkit', () => {
  const actualToolkit = jest.requireActual('@reduxjs/toolkit');
  return {
    ...actualToolkit,
    nanoid: jest.fn(() => 'mocked-id')
  };
});

describe('action slice contructor test', () => {
  let initialState: IconstrustorSlise = {
    bun: null,
    ingredients: [
      {
        _id: '643d69a5c3f7b9001cfa0941',
        id: '1',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      },
      {
        _id: '643d69a5c3f7b9001cfa093e',
        id: '2',
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
        _id: '643d69a5c3f7b9001cfa093f',
        id: '3',
        name: 'Мясо бессмертных моллюсков Protostomia',
        type: 'main',
        proteins: 433,
        fat: 244,
        carbohydrates: 33,
        calories: 420,
        price: 1337,
        image: 'https://code.s3.yandex.net/react/code/meat-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
      }
    ]
  };

  it('add ingredients bun', () => {
    const newBun: TConstructorIngredient = {
      _id: '643d69a5c3f7b9001cfa093c',
      id: 'mocked-id',
      type: 'bun',
      name: 'Краторная булка N-200i',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    };

    let state = constructorSlice.reducer(initialState, addToBurger(newBun));

    expect(state.bun).toEqual(newBun);
  });

  it('add ingredients main', () => {
    const newMain: TConstructorIngredient = {
      _id: '643d69a5c3f7b9001cfa093c',
      id: 'mocked-id',
      type: 'main',
      name: 'Соус фирменный Space Sauce',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    };

    let state = constructorSlice.reducer(initialState, addToBurger(newMain));

    expect(state.ingredients[3]).toEqual(newMain);
  });

  it('remove ingredient', () => {
    const removeIngredients: TConstructorIngredient = {
      _id: '643d69a5c3f7b9001cfa093c',
      id: 'mocked-id',
      type: 'main',
      name: 'Соус фирменный Space Sauce',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    };

    let state = constructorSlice.reducer(
      initialState,
      addToBurger(removeIngredients)
    );

    expect(state.ingredients.length).toBe(4);

    state = constructorSlice.reducer(state, removeIngredient('mocked-id'));

    expect(state.ingredients.length).toBe(3);
    expect(
      state.ingredients.find((item) => item.id === 'mocked-id')
    ).toBeUndefined();
  });

  it('move ingredient down', () => {
    const state = constructorSlice.reducer(
      initialState,
      moveIngredient({ index: 0, direction: 'down' })
    );

    expect(state.ingredients[0].id).toBe('2');
    expect(state.ingredients[1].id).toBe('1');
    expect(state.ingredients[2].id).toBe('3');
  });

  it('move ingredient up', () => {
    const state = constructorSlice.reducer(
      initialState,
      moveIngredient({ index: 2, direction: 'up' })
    );

    expect(state.ingredients[0].id).toBe('1');
    expect(state.ingredients[1].id).toBe('3');
    expect(state.ingredients[2].id).toBe('2');
  });
});
