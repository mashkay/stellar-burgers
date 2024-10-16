import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { logoutThunk } from '../auth';

export interface BurgerConstructorState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  selectors: {
    selectBun: (state: BurgerConstructorState) => state.bun,
    selectItems: (state: BurgerConstructorState) => state
  },
  reducers: {
    setBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.ingredients.push(action.payload);
      },
      prepare: (item: TIngredient) => ({ payload: { ...item, id: nanoid() } })
    },
    removeOneIngredient: (state, action: PayloadAction<number>) => {
      state.ingredients.splice(action.payload, 1);
    },
    swapItemsPositions: (state, action: PayloadAction<number[]>) => {
      const [dragIndex, hoverIndex] = action.payload;
      const dragItem = state.ingredients[dragIndex];
      state.ingredients = state.ingredients.filter(
        (_, index) => index !== dragIndex
      );
      state.ingredients.splice(hoverIndex, 0, dragItem);
    }
  },
  extraReducers: (builder) => {
    builder
      // сброс конструктора при логауте
      .addCase(logoutThunk.fulfilled, (state) => {
        state.bun = initialState.bun;
        state.ingredients = initialState.ingredients;
      });
  }
});

export default burgerConstructorSlice;

export const { selectBun, selectItems } = burgerConstructorSlice.selectors;
export const {
  setBun,
  addIngredient,
  removeOneIngredient,
  swapItemsPositions
} = burgerConstructorSlice.actions;
