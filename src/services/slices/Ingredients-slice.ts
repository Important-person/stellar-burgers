import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

export const fetchIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => getIngredientsApi()
);

interface IIngredirntsSlice {
  ingredients: TIngredient[];
  error: string | undefined;
  isLoading: boolean;
}

const initialState: IIngredirntsSlice = {
  ingredients: [],
  error: undefined,
  isLoading: false
};

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  },
  selectors: {
    ingredientSelector: (state) => state.ingredients,
    ingredientSelectorIsLoading: (state) => state.isLoading
  }
});

export const { ingredientSelector, ingredientSelectorIsLoading } =
  ingredientSlice.selectors;

export default ingredientSlice.reducer;
