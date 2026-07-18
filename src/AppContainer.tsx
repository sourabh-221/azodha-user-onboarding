import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { Toaster } from 'sonner';

import App from './App';
import { store } from './redux/store';

const AppContainer = () => {
  return (
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
          <Toaster position='top-right' richColors closeButton />
        </BrowserRouter>
      </Provider>
    </StrictMode>
  );
};

export default AppContainer;
