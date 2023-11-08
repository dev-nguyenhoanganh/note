import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import ThemeProvider from 'src/theme';
import Router from 'src/routes';
import store from 'src/store';
// import StyledChart from './components/chart/styles';
// import Snackbar from 'src/components/snackbar';

function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider>
            {/* <StyledChart /> */}
            <Router />
            {/* <Snackbar /> */}
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </React.Fragment>
  );
}

export default App;
