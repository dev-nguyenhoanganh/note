import React, { FC, ReactElement } from 'react';
import { IntlProvider } from 'react-intl';
// Read more: https://testing-library.com/docs/example-react-intl/
import { render as rtlRender, RenderResult } from '@testing-library/react';
// Load resources
import enMessage from 'src/resources/lang/en.json';

const loadLocaleData = (locale: string) => {
  switch (locale) {
    case 'en-US':
      return enMessage;

    default:
      return enMessage;
  }
};

const render = (ui: ReactElement, messages = loadLocaleData('en'), { ...renderOptions } = {}): RenderResult => {
  const Wrapper: FC<React.PropsWithChildren<unknown>> = ({ children }) => {
    return (
      <IntlProvider locale={'en'} messages={messages}>
        {children}
      </IntlProvider>
    );
  };

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

// override default render method
export { render };
