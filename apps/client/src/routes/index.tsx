import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../hooks/ProtectedRoute';

import Auth from '../pages/SignIn';

import { ChatList } from '../pages/ChatList';
import { Layout } from '../components/global/Layout';
import { useAuth } from '../hooks/useAuth';

export function Router() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Private */}
        {user ? (
          <Route
            element={<ProtectedRoute isAuthorized={true} redirectPath="/" />}
          >
            <Route path="/" element={<ChatList />} />
          </Route>
        ) : null}
        {/* Public */}
        <Route path="/" element={<Auth />} />
      </Route>
    </Routes>
  );
}
