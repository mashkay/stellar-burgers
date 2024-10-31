import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useAppDispatch } from '@store';
import { auth } from '@slices';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(auth.logoutThunk());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
