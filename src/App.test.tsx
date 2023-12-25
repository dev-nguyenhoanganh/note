// import '@testing-library/jest-dom';
import { act } from '@testing-library/react';
import App from './App';
import { render } from './test-utils-intl';

jest.mock('@fontsource/public-sans', () => {});
jest.mock('./style.css', () => {});

describe('Describe 1: Test Login Page', () => {
  test('Case 1: Display sucess', async () => {
    await act(async () => {
      render(<App />);
    });
  });
});
