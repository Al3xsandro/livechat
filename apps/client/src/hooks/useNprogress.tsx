import { useEffect } from 'react';

import NProgress from 'nprogress';

import { useLocation } from 'react-router-dom';

export function NProgressLoad() {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    NProgress.done();
  }, [location.pathname]);

  return null;
}
