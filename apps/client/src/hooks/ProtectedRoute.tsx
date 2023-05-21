import { ReactNode } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

interface IProps {
  isAuthorized: boolean;
  redirectPath?: string;
  children?: ReactNode;
}

export function ProtectedRoute({
  isAuthorized,
  children,
  redirectPath = '/',
}: IProps) {
  if (!isAuthorized) {
    return <Navigate to={redirectPath} replace={true} />;
  }

  return <Outlet />;
}
