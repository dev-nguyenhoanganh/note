import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

import ThemeProvider from 'src/theme';
import Router from 'src/routes';
import store from 'src/store';
// import StyledChart from './components/chart/styles';
import Snackbar from 'src/components/snackbar';

// Load resources
import enMessage from 'src/resources/lang/en.json';

const loadLocaleData = (locale: string) => {
  switch (locale) {
    case 'en':
      return enMessage;

    default:
      return enMessage;
  }
};

const App = () => {
  const locale = navigator.language;
  const messages = loadLocaleData(locale);

  return (
    <React.Fragment>
      <IntlProvider locale={locale} defaultLocale="en" messages={messages}>
        <Provider store={store}>
          <BrowserRouter>
            <ThemeProvider>
              {/* <StyledChart /> */}
              <Router />
              <Snackbar />
            </ThemeProvider>
          </BrowserRouter>
        </Provider>
      </IntlProvider>
    </React.Fragment>
  );
};

export default App;
