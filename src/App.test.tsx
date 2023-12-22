// import '@testing-library/jest-dom';
import { act, fireEvent } from '@testing-library/react';

import App from './App';
import { render } from './test-utils-intl';

test('Case 5: Session state is not available', async () => {
  await act(async () => {
    render(<App />);
  });
});
