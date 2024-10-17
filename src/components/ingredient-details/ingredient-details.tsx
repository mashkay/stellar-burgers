import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useAppSelector } from '@store';
import { ingredients } from '@slices';
import { useParams } from 'react-router-dom';
import { NotFound404 } from '@pages';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return <NotFound404 />;
  }

  const isLoaded = useAppSelector(ingredients.selectIsLoaded);
  const ingredientData = useAppSelector((state) =>
    ingredients.selectIngredientById(state, id)
  );

  if (ingredientData) {
    return <IngredientDetailsUI ingredientData={ingredientData} />;
  }

  if (isLoaded && !ingredientData) {
    return <NotFound404 />;
  }
  return <Preloader />;
};
