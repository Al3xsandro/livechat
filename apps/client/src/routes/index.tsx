import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../hooks/ProtectedRoute';

import Auth from '../pages/SignIn';

export function Router() {
  return (
    <Routes>
      {/* <Route
        path="/"
        element={<ProtectedRoute isAuthorized={false} redirectPath="/" />}
      ></Route> */}
      {/* Public */}
      <Route path="/" element={<Auth />} />
    </Routes>
  );
}
