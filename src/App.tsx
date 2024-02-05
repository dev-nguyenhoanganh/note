import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import ThemeProvider from '@/theme';
import Router from '@/routes';
import store from '@/store';
import StyledChart from '@/components/chart/styles';
import { SnackbarProvider } from '@/components/snackbar';

import './style.css';
import { Suspense } from 'react';
import { Loading } from '@/components/loading';
import { ErrorBoundary } from '@/pages/Error';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary>
          <ThemeProvider>
            <SnackbarProvider>
              <Suspense fallback={<Loading />}>
                <Router />
              </Suspense>
              <StyledChart />
            </SnackbarProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
