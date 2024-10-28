import { profileFeed } from '@slices';
import { useAppDispatch, useAppSelector } from '@store';
import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useAppSelector(profileFeed.selectOrders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(profileFeed.fetchProfileFeedThunk());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
