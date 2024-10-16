import { ConstructorPage } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { useEffect } from 'react';
import { useAppDispatch } from '@store';
import { auth } from '@slices';
import { useLocation } from 'react-router-dom';

const App = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(auth.checkUserAuthThunk());
  }, []);
  return (
    <div className={styles.app}>
      <AppHeader />
      <ConstructorPage />
    </div>
  );
};

export default App;
