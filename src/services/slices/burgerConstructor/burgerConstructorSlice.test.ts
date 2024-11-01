import { logoutThunk } from '../auth';

import { placeOrderThunk } from '../order';
import burgerConstructorSlice, {
  BurgerConstructorState,
  selectBun,
  selectIngredientsForOrder,
  selectIngredients,
  selectItems
} from './burgerConstructorSlice';

const { reducer } = burgerConstructorSlice;

export const burgerConstructorSliceInitialState: BurgerConstructorState = {
  bun: null,
  ingredients: []
};

const testBun = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0
};

const testIngredient1 = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  __v: 0
};

const testIngredient2 = {
  _id: '643d69a5c3f7b9001cfa093e',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  __v: 0
};

const stateWithTwoIngredients = {
  bun: testBun,
  ingredients: [
    { ...testIngredient1, id: '1' },
    { ...testIngredient2, id: '2' }
  ]
};

const stateWithTwoEqualIngredients = {
  bun: testBun,
  ingredients: [
    { ...testIngredient1, id: '1' },
    { ...testIngredient1, id: '2' }
  ]
};

describe('burgerConstructorSlice', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('initialization', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(
        burgerConstructorSliceInitialState
      );
    });
    it('should not change state on unknown action', () => {
      const action = { type: 'unknown' };
      const actual = reducer(stateWithTwoIngredients, action);
      expect(actual).toEqual(stateWithTwoIngredients);
    });
  });

  describe('reducers', () => {
    it('should handle setBun', () => {
      const actual = reducer(
        burgerConstructorSliceInitialState,
        burgerConstructorSlice.actions.setBun(testBun)
      );
      expect(actual.bun).toEqual(testBun);
    });

    it('should handle addIngredient', () => {
      const actual = reducer(
        burgerConstructorSliceInitialState,
        burgerConstructorSlice.actions.addIngredient(testIngredient1)
      );

      expect(
        actual.ingredients.some((item) => item._id === testIngredient1._id)
      ).toBe(true);

      expect(actual.ingredients.length).toBe(1);

      expect(actual.ingredients[0].id).toBeDefined();
    });

    it('two same ingredient have different id', () => {
      let actual = reducer(
        burgerConstructorSliceInitialState,
        burgerConstructorSlice.actions.addIngredient(testIngredient1)
      );
      actual = reducer(
        actual,
        burgerConstructorSlice.actions.addIngredient(testIngredient1)
      );
      expect(actual.ingredients.length).toBe(2);
      expect(actual.ingredients[0].id).not.toBe(actual.ingredients[1].id);
    });

    it('should handle removeOneIngredient whith 2 different ingredients', () => {
      const actual = reducer(
        stateWithTwoIngredients,
        burgerConstructorSlice.actions.removeOneIngredient(0)
      );

      expect(actual.ingredients.length).toBe(1);
      expect(actual.ingredients[0]._id).toBe(
        stateWithTwoIngredients.ingredients[1]._id
      );
    });

    it('should handle removeOneIngredient whith 2 equal ingredients', () => {
      const actual = reducer(
        stateWithTwoEqualIngredients,
        burgerConstructorSlice.actions.removeOneIngredient(0)
      );

      expect(actual.ingredients.length).toBe(1);
      expect(actual.ingredients[0]._id).toBe(
        stateWithTwoEqualIngredients.ingredients[0]._id
      );
    });

    it('should handle swapItemsPositions', () => {
      const actual = reducer(
        stateWithTwoIngredients,
        burgerConstructorSlice.actions.swapItemsPositions([0, 1])
      );

      expect(actual.ingredients[0]._id).toBe(
        stateWithTwoIngredients.ingredients[1]._id
      );
      expect(actual.ingredients[1]._id).toBe(
        stateWithTwoIngredients.ingredients[0]._id
      );
    });
  });

  describe('extraReducers', () => {
    it('should reset the constructor on logout', () => {
      const action = { type: logoutThunk.fulfilled.type };
      const actual = reducer(stateWithTwoIngredients, action);
      expect(actual).toEqual(burgerConstructorSliceInitialState);
    });

    it('should reset the constructor after a successful order', () => {
      const action = { type: placeOrderThunk.fulfilled.type };
      const actual = reducer(stateWithTwoIngredients, action);
      expect(actual).toEqual(burgerConstructorSliceInitialState);
    });
  });

  describe('selectors', () => {
    const state = { burgerConstructor: stateWithTwoIngredients };
    it('select bun', () => {
      expect(selectBun(state)).toEqual(testBun);
    });
    it('select ingredients', () => {
      expect(selectIngredients(state)).toEqual(
        stateWithTwoIngredients.ingredients
      );
    });
    it('select items', () => {
      expect(selectItems(state)).toEqual(stateWithTwoIngredients);
    });
    it('select ingredients for order', () => {
      expect(selectIngredientsForOrder(state)).toEqual([
        stateWithTwoIngredients.bun._id,
        ...stateWithTwoIngredients.ingredients.map((item) => item._id),
        stateWithTwoIngredients.bun._id
      ]);
    });
  });
});
