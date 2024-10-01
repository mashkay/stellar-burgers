import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation } from 'react-router-dom';

const App = () => {
  const location = useLocation();

  const state = location.state as { bachgroundLocaton?: Location };

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={state?.bachgroundLocaton || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/orders' element={<ProfileOrders />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {state?.bachgroundLocaton && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='hhh' onClose={() => console.log('hi')}>
                <Feed />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='hhh' onClose={() => console.log('hi')}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='hhh' onClose={() => console.log('hi')}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile'
            element={
              <Modal title='hhh' onClose={() => console.log('hi')}>
                <Profile />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
