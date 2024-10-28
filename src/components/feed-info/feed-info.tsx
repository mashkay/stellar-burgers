import { FC } from 'react';

import { FeedInfoUI } from '../ui/feed-info';
import { useAppSelector } from '@store';
import { feed as feedStore } from '@slices';

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора */

  const feed = {
    total: useAppSelector(feedStore.selectTotal),
    totalToday: useAppSelector(feedStore.selectTotalToday)
  };

  const readyOrders = useAppSelector(feedStore.selectOrdersDone);

  const pendingOrders = useAppSelector(feedStore.selectOrdersPending);
  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
