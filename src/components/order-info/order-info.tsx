import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { NotFound404 } from '@pages';
import { useAppDispatch, useAppSelector } from '@store';
import { ingredients as ingredientsStore, orderPreview } from '@slices';
import { selectOrderByNumber } from '@selectors';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */

  const { id } = useParams<{ id: string }>();
  const orderNumber = Number(id);
  if (!orderNumber || isNaN(orderNumber)) {
    return <NotFound404 />;
  }

  // получаем данные заказа из стора по номеру orderNumber
  const orderData = useAppSelector((state) =>
    selectOrderByNumber(state, orderNumber)
  );
  // была ли попытка загрузить данные заказа c номером orderNumber с сервера
  const orderIsFetched = useAppSelector((state) =>
    orderPreview.selectOrderIsFetched(state, orderNumber)
  );

  const ingredients: TIngredient[] = useAppSelector(
    ingredientsStore.selectIngredients
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (orderData === null) {
      dispatch(orderPreview.getOrderByNumberThunk(orderNumber));
    }
  }, []);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (orderInfo) {
    return <OrderInfoUI orderInfo={orderInfo} />;
  }

  if (orderIsFetched && !orderInfo) {
    return <NotFound404 />;
  }

  return <Preloader />;
};
