import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import ThemeProvider from '@/theme';
import Router from '@/routes';
import store from '@/store';
import StyledChart from '@/components/chart/styles';
import { SnackbarProvider } from '@/components/snackbar';

import './style.css';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <SnackbarProvider>
            <Router />
            <StyledChart />
          </SnackbarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
