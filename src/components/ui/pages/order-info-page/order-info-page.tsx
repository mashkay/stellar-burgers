import { OrderInfo } from '@components';
import { FC } from 'react';
import styles from './order-info-page.module.css';

export const OrderInfoPageUI: FC = () => (
  <main className={styles.container}>
    <div className={`${styles.wrapCenter}`}>
      <OrderInfo />
    </div>
  </main>
);
