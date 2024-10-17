import { feed } from '@slices';
import { useAppDispatch, useAppSelector } from '@store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(feed.fetchFeedsThunk());
  }, []);

  const orders: TOrder[] = useAppSelector(feed.selectOrders);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(feed.fetchFeedsThunk());
      }}
    />
  );
};
