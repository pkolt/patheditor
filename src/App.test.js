import React from 'react';
import {render, fireEvent, cleanup, wait} from '@testing-library/react';
import App from './App';
import mockItems from './mockItems.json';
import mockFetch from './mockFetch.json';

const applyMockLocalStorage = () => jest.spyOn(global, 'localStorage', 'get').mockImplementation(() => ({
  getItem: () => JSON.stringify(mockItems)
}));

const applyMockFetch = () => jest.spyOn(global, 'fetch').mockImplementation(async () => ({
  json: async () => ({...mockFetch})
}));

afterEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
  jest.restoreAllMocks();
  localStorage.clear();
  cleanup();
});

test('Show empty list', () => {
  const {getByTestId, queryAllByTestId} = render(<App/>);
  expect(getByTestId('app')).toBeInTheDocument();
  expect(queryAllByTestId('list-item')).toHaveLength(0);
});

test('Show list', () => {
  const spy = applyMockLocalStorage();

  const {getAllByTestId} = render(<App/>);

  expect(spy).toHaveBeenCalled();

  const item = getAllByTestId('list-item');
  expect(item).toHaveLength(4);
});

test('Create item', async () => {
  const spy = applyMockFetch();

  const {getByTestId, getAllByTestId, queryAllByTestId} = render(<App/>);
  expect(queryAllByTestId('list-item')).toHaveLength(0);

  const input = getByTestId('search-input');
  fireEvent.change(input, {target: {value: 'Екатеринбург'}});
  expect(input.value).toBe('Екатеринбург');

  const form = getByTestId('search-form');
  fireEvent.submit(form);

  await wait();

  expect(spy).toHaveBeenCalledTimes(1);
  expect(input.value).toBe('');
  expect(getAllByTestId('list-item')).toHaveLength(1);
});

test('Remove item', () => {
  const spy = applyMockLocalStorage();

  const {getAllByTestId} = render(<App/>);

  expect(spy).toHaveBeenCalled();

  expect(getAllByTestId('list-item')).toHaveLength(4);

  const [removeButton] = getAllByTestId('remove-button');
  fireEvent.click(removeButton);

  expect(getAllByTestId('list-item')).toHaveLength(3);
})