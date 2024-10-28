import { createSelector, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { fetchIngredientsThunk } from './actions';

export interface IngredientsState {
  ingredients: TIngredient[];
  error: string | null;
}

const initialState: IngredientsState = {
  ingredients: [],
  error: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state: IngredientsState) => state.ingredients,
    selectError: (state: IngredientsState) => state.error,
    selectBuns: createSelector(
      (state: IngredientsState) => state.ingredients,
      (ingredients) =>
        ingredients.filter(
          (ingredient: TIngredient) => ingredient.type === 'bun'
        )
    ),
    selectMains: createSelector(
      (state: IngredientsState) => state.ingredients,
      (ingredients) =>
        ingredients.filter(
          (ingredient: TIngredient) => ingredient.type === 'main'
        )
    ),
    selectSauces: createSelector(
      (state: IngredientsState) => state.ingredients,
      (ingredients) =>
        ingredients.filter(
          (ingredient: TIngredient) => ingredient.type === 'sauce'
        )
    ),
    selectIsLoaded: createSelector(
      (state: IngredientsState) => state.ingredients,
      (ingredients) => ingredients.length > 0
    )
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchIngredientsThunk.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.error = null;
      })
      .addCase(fetchIngredientsThunk.rejected, (state, action) => {
        state.error = action?.error?.message || 'fetch ingredients failed';
      });
  }
});

export default ingredientsSlice;

export const {
  selectError,
  selectIngredients,
  selectBuns,
  selectMains,
  selectSauces,
  selectIsLoaded
} = ingredientsSlice.selectors;

export const selectIngredientById = createSelector(
  [selectIngredients, (_, id: string) => id],
  (ingredients, id) => ingredients.find((item) => item._id === id)
);
