import { FC, useMemo, useState } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useAppSelector } from '@store';
import { auth, burgerConstructor, order } from '@slices';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */

  const constructorItems = useAppSelector(burgerConstructor.selectItems);
  const ingredients = useAppSelector(
    burgerConstructor.selectIngredientsForOrder
  );
  const user = useAppSelector(auth.selectUser);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const orderRequest = useAppSelector(order.selectIsProcessing);

  const orderModalData = useAppSelector(order.selectOrder);

  // стейт для отображения ошибок конструктора, например если не выбрана булка
  const [showErrors, setShowErrors] = useState({});

  const onOrderClick = () => {
    if (orderRequest) return;
    if (!constructorItems.bun) {
      setShowErrors({ ...showErrors, bun: 'Выберите булки' });
      setTimeout(() => {
        setShowErrors({});
      }, 500);
      return;
    }
    if (user === null) {
      navigate('/login');
      return;
    }

    dispatch(order.placeOrderThunk(ingredients));
  };
  const closeOrderModal = () => {
    dispatch(order.clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      showErrors={showErrors}
    />
  );
};
