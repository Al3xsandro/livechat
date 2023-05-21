import './styles/global.css';
import './assets/nprogress/nprogress.css';

import { Toaster } from 'react-hot-toast';

import { BrowserRouter } from 'react-router-dom';
import { NProgressLoad } from './hooks/useNprogress';
import { Router } from './routes';

function App() {
  return (
    <BrowserRouter>
      <NProgressLoad />
      <Toaster position="top-right" gutter={10} />
      <Router />
    </BrowserRouter>
  );
}

export default App;
