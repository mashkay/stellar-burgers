import { auth } from '@slices';
import { useAppSelector } from '@store';
import { Preloader } from '@ui';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  component: React.JSX.Element;
  onlyUnAuth?: boolean;
};

const ProtectedRoute = ({
  component,
  onlyUnAuth = false
}: ProtectedRouteProps): React.JSX.Element => {
  const isAuthChecked = useAppSelector(auth.selectIsAuthChecked);
  const user = useAppSelector(auth.selectUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }
  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }
  if (onlyUnAuth && user) {
    return <Navigate replace to={location.state?.from?.pathname || '/'} />;
  }
  return component;
};

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({
  component
}: {
  component: React.JSX.Element;
}): React.JSX.Element => <ProtectedRoute onlyUnAuth component={component} />;
