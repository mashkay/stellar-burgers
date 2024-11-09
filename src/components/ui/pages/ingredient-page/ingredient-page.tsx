import { IngredientDetails } from '@components';
import { FC } from 'react';
import styles from './ingredient-page.module.css';

export const IngredientPageUI: FC = () => (
  <main className={styles.container}>
    <div className={`${styles.wrapCenter}`}>
      <h3 className={'text text_type_main-large'}>Детали ингредиента</h3>
      <IngredientDetails />
    </div>
  </main>
);
