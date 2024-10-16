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
    return <Preloader />;
  }

  const isLoaded = useAppSelector(ingredients.selectIsLoaded);
  const ingredientData = useAppSelector((state) =>
    ingredients.selectIngredientById(state, id)
  );

  if (!isLoaded) {
    return <Preloader />;
  }

  if (isLoaded && !ingredientData) {
    return <NotFound404 />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData!} />;
};
