import React from 'react';
import {render} from '@testing-library/react';
import App from './App';

test('render application', () => {
  const {getByTestId} = render(<App />);

  const appElement = getByTestId('app');
  expect(appElement).toBeInTheDocument();

  const listElement = getByTestId('list');
  expect(listElement).toBeInTheDocument();
});