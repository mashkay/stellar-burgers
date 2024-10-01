import { ConstructorPage, Feed } from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { AppHeader, Modal } from '@components';
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate
} from 'react-router-dom';

const App = () => {
  const backgroundLocation = useLocation();
  const navigate = useNavigate();
  return (
    <div className={styles.app}>
      <AppHeader />
      <Outlet />
      {backgroundLocation && (
        <Routes>
          <Route
            path='/'
            element={
              <Modal
                title={'1'}
                onClose={() => {
                  navigate(-1);
                  console.log('qwe');
                }}
              >
                <ConstructorPage />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
