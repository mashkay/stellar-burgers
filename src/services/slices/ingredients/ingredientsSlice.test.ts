import { fetchIngredientsThunk } from './actions';
import ingredientsSlice, {
  IngredientsState,
  selectBuns,
  selectError,
  selectIngredientById,
  selectIngredients,
  selectIsLoaded,
  selectMains,
  selectSauces
} from './ingredientsSlice';

const reducer = ingredientsSlice.reducer;

export const ingredientsSliceInitialState: IngredientsState = {
  ingredients: [],
  error: null
};

const ingredient1 = {
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

const ingredient2 = {
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

const ingredient3 = {
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  __v: 0
};

describe('ingredientsSlice', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(
      ingredientsSliceInitialState
    );
  });

  describe('fetchIngredientsThunk', () => {
    const cases = [
      { name: 'initial', state: ingredientsSliceInitialState },
      {
        name: 'hasIngredients',
        state: {
          ...ingredientsSliceInitialState,
          ingredients: [ingredient1, ingredient2]
        }
      }
    ];
    cases.forEach((item) => {
      it(`${item.name} state: , fulfilled`, () => {
        const previousState = item.state;
        const action = {
          type: fetchIngredientsThunk.fulfilled.type,
          payload: [ingredient1, ingredient2, ingredient3]
        };
        expect(reducer(previousState, action)).toEqual({
          ingredients: [ingredient1, ingredient2, ingredient3],
          error: null
        });
      });

      it(`${item.name} state: rejected`, () => {
        const message = 'FAIL MSG';
        const previousState = item.state;
        const action = {
          type: fetchIngredientsThunk.rejected.type,
          error: { message }
        };
        expect(reducer(previousState, action)).toEqual({
          ...previousState,
          error: message
        });
      });
      it(`${item.name} state: pending`, () => {
        const previousState = item.state;
        const action = {
          type: fetchIngredientsThunk.pending.type
        };
        expect(reducer(previousState, action)).toEqual({
          ...previousState,
          error: null
        });
      });
    });
  });

  describe('selectors', () => {
    const state = {
      ingredients: {
        ...ingredientsSliceInitialState,
        ingredients: [ingredient1, ingredient2, ingredient3]
      }
    };
    it('select ingredients', () => {
      expect(selectIngredients(state)).toEqual([
        ingredient1,
        ingredient2,
        ingredient3
      ]);
    });

    it('select error', () => {
      expect(selectError(state)).toEqual(null);
    });

    it('select buns', () => {
      expect(selectBuns(state)).toEqual([ingredient1]);
    });

    it('select mains', () => {
      expect(selectMains(state)).toEqual([ingredient2]);
    });

    it('select sauces', () => {
      expect(selectSauces(state)).toEqual([ingredient3]);
    });

    it('select isLoaded', () => {
      expect(selectIsLoaded(state)).toEqual(true);
    });

    it('select ingredient by id', () => {
      expect(selectIngredientById(state, '643d69a5c3f7b9001cfa0941')).toEqual(
        ingredient2
      );
    });
  });
});
