import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import ThemeProvider from 'src/theme';
import Router from 'src/routes';
import store from 'src/store';
import StyledChart from 'src/components/chart/styles';
import { SnackbarProvider } from 'src/components/snackbar';

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
