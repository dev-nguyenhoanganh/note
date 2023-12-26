import '@testing-library/jest-dom';
import LoginPage from './LoginPage';

import { renderWithProviders } from '@/utils/test-utils';
import { act } from 'react-dom/test-utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';

const mockedNavigate = jest.fn();

jest.mock('@fontsource/public-sans', () => {});

jest.mock('react-router-dom', () => ({
  __esModule: true,
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('Login component', () => {
  describe('UI', () => {
    test('should render logo, username, password, and button', async () => {
      renderWithProviders(<LoginPage />);

      expect(screen.getByText('Sign in')).toBeInTheDocument();
      expect(screen.getByTestId('google-button')).toBeEnabled();
      expect(screen.getByTestId('facebook-button')).toBeEnabled();
      expect(screen.getByTestId('twitter-button')).toBeEnabled();
      expect(screen.getByTestId('or-label')).toBeEnabled();
      expect(screen.getByTestId('username-input')).toBeEnabled();
      expect(screen.getByTestId('password-input')).toBeEnabled();
      expect(screen.getByTestId('sign-in-label')).toBeEnabled();
      expect(screen.getByTestId('forgot-button')).toBeEnabled();
      expect(screen.getByText('Remember me')).toBeInTheDocument();
    });

    test('should show error message when username or password is empty', async () => {
      await act(async () => {
        renderWithProviders(<LoginPage />);
      });

      expect(screen.getByTestId('username-input')).toHaveTextContent('');
      expect(screen.getByTestId('password-input')).toHaveTextContent('');

      await act(async () => {
        const loginBtn = screen.getByTestId('login-button');
        fireEvent.click(loginBtn);
      });

      expect(screen.getAllByText('Please fill out this field.')[0]).toBeInTheDocument();
    });

    test('should show error message when username or password is invalid', async () => {
      await act(async () => {
        renderWithProviders(<LoginPage />);
      });

      // username must be at least 4 characters
      await act(async () => {
        const usernameInput = screen.getByTestId('username-input');
        fireEvent.change(usernameInput, {
          target: {
            value: '111',
          },
        });
      });

      await act(async () => {
        const passwordInput = screen.getByTestId('password-input');
        fireEvent.change(passwordInput, {
          target: {
            value: 'admin',
          },
        });
      });

      await act(async () => {
        const loginBtn = screen.getByTestId('login-button');
        fireEvent.click(loginBtn);
      });

      await act(async () => {
        expect(screen.getByText('username must be at least 4 characters')).toBeDefined();
      });
    });
  });

  describe('Actions', () => {
    test('should call login API when button is clicked', async () => {
      await act(async () => {
        renderWithProviders(<LoginPage />);
      });

      await act(async () => {
        const googleButton = screen.getByTestId('google-button');
        fireEvent.click(googleButton);
      });
    });

    test('should navigate to home page when login is successful', async () => {
      await act(async () => {
        renderWithProviders(<LoginPage />);
      });

      screen.debug();

      await act(async () => {
        const usernameInput = screen.getByTestId('username-input');
        fireEvent.change(usernameInput, {
          target: {
            value: 'admin',
          },
        });
      });

      await act(async () => {
        const passwordInput = screen.getByTestId('password-input');
        fireEvent.change(passwordInput, {
          target: {
            value: '1111111',
          },
        });
      });

      await act(async () => {
        const loginBtn = screen.getByTestId('login-button');
        fireEvent.click(loginBtn);
      });

      await waitFor(
        () => {
          expect(mockedNavigate).toHaveBeenCalledWith('/', { replace: true });
        },
        {
          timeout: 2000,
        },
      );
    });
  });
});
