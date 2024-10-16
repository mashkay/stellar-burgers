import { ConstructorPage, Feed, Login, NotFound404 } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { useEffect } from 'react';
import { useAppDispatch } from '@store';
import { auth } from '@slices';
import { Route, Routes, useLocation } from 'react-router-dom';
import { OnlyUnAuth } from '../protected-route';

const App = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(auth.checkUserAuthThunk());
  }, []);
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={location.state?.background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

export default App;
