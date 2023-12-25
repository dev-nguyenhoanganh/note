import { PropsWithChildren, ReactElement } from 'react';
import { RenderResult, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@/store';
import ThemeProvider from '@/theme';
import { IntlProvider } from 'react-intl';
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

/**
 * A helper function to render a React component with the necessary providers
 *
 * @param ui The components to render
 * @param renderOptions The options to pass to the render function
 * @returns {renderWithProviders} The result of rendering the component with the wrapper and the options
 */
export const renderWithProviders = (
  ui: ReactElement,
  messages = loadLocaleData('en'),
  { ...renderOptions } = {},
): RenderResult => {
  // A wrapper component that provides the theme and the store to the component
  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return (
      <IntlProvider
        locale={'en'}
        messages={messages}
      >
        <ThemeProvider>
          <Provider store={store}>{children}</Provider>
        </ThemeProvider>
      </IntlProvider>
    );
  }

  // Return the result of rendering the component with the wrapper and the options
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};
