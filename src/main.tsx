import { HelmetProvider } from 'react-helmet-async';
import { Provider as StoreProvider } from 'react-redux';

import { SnackbarProvider } from 'notistack';
import ReactDOM from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import ErrorBoundary from './errorBoundary';
import appStore, { persistor } from './store';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <ErrorBoundary>
    <StoreProvider store={appStore}>
      <PersistGate persistor={persistor}>
        <SnackbarProvider autoHideDuration={5000} maxSnack={5}>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </SnackbarProvider>
      </PersistGate>
    </StoreProvider>
  </ErrorBoundary>,
);
