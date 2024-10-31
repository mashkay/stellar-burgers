import { createSelector } from '@reduxjs/toolkit';
import { feed, profileFeed, orderPreview } from '@slices';
import { RootState } from '@store';

export const selectOrderByNumber = createSelector(
  (state: RootState, orderNumber: number) => orderNumber,
  feed.selectOrders,
  profileFeed.selectOrders,
  orderPreview.selectOrder,

  (orderNumber, feedOrders, profileFeedOrders, fetchedOrder) => {
    const order = feedOrders.find((order) => order.number === orderNumber);
    if (order) return order;
    const profileOrder = profileFeedOrders.find(
      (order) => order.number === orderNumber
    );
    if (profileOrder) return profileOrder;
    if (fetchedOrder && fetchedOrder.number === orderNumber) {
      return fetchedOrder;
    }
    return null;
  }
);
