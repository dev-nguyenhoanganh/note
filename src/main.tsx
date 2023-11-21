import React from 'react';
import ReactDOM from 'react-dom/client';
import { IntlProvider } from 'react-intl';

import App from '@/App.tsx';

// Load resources
import enMessage from '@/resources/lang/en.json';

const loadLocaleData = (locale: string) => {
  switch (locale) {
    case 'en-US':
      return enMessage;

    default:
      return enMessage;
  }
};

const bootstrapApp = async () => {
  const locale = navigator.language;
  const messages = loadLocaleData(locale);

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <IntlProvider locale={locale} defaultLocale="en" messages={messages}>
        <App />
      </IntlProvider>
    </React.StrictMode>
  );
};

bootstrapApp();
