import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import LoginPage from './LoginPage';
import ThemeProvider from '@/theme';
import { Provider } from 'react-redux';
import store from '@/store';

jest.mock('@fontsource/public-sans', () => {});

jest.mock('react-intl', () => ({
  __esModule: true,
  ...jest.requireActual('react-intl'),
  useIntl: jest.fn(() => ({
    formatMessage: jest.fn(),
  })),
}));

jest.mock('react-router-dom', () => ({
  __esModule: true,
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => {},
}));

describe('Describe 1: Check login sucess', () => {
  test('Case 1: Test Display', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <LoginPage />
        </ThemeProvider>
      </Provider>,
    );
  });
});
