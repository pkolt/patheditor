import React, {useState, useMemo, useEffect, useCallback} from 'react';
import uuid from 'uuid/v1';
import SearchForm from './components/SearchForm';
import List from './components/List';
import Map from './components/Map';
import {searchPoint} from './util';

function App() {
  const moscowPoint = [55.75, 37.57];
  const localStorageKey = 'path-editor';
  const getItemsLocalStorage = () => localStorage.getItem(localStorageKey) && JSON.parse(localStorage.getItem(localStorageKey));
  const setItemsLocalStorage = (value) => localStorage.setItem(localStorageKey, JSON.stringify(value));

  const [searchValue, setSearchValue] = useState('');
  const [activeItemId, setActiveItemId] = useState('');
  const [items, setItems] = useState(getItemsLocalStorage());

  const centerPoint = useMemo(() => {
    const activeItem = items.filter(item => item.id === activeItemId)[0];
    const firstItem = items[0];
    return (activeItem && activeItem.point) || (firstItem && firstItem.point) || moscowPoint;
  }, [items, activeItemId]);


  useEffect(() => {
    setItemsLocalStorage(items);
  }, [items]);

  const onRemoveItem = useCallback((id) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  }, []);

  const onChangeSearchValue = useCallback((value) => {
    setSearchValue(value);
  }, []);

  const onSubmit = useCallback(async () => {
    if (searchValue) {
      const point = await searchPoint(searchValue);
      if (point) {
        setItems(prevItems => [
          {
            id: uuid(),
            title: searchValue,
            point
          },
          ...prevItems
        ]);
        setSearchValue('');
      }
    }
  }, [searchValue]);

  const onChangeItemPoint = useCallback((id, point) => {
    setItems(prevItems => prevItems.map(item => item.id === id ? {...item, point} : item));
  }, []);

  const onChangeActiveItem = useCallback((id) => setActiveItemId(id), []);

  return <div className="container mt-5">
          <div className="row">
            <div className="col-sm">
              <SearchForm value={searchValue} onChangeValue={onChangeSearchValue} onSubmit={onSubmit}/>
              <List items={items} onRemove={onRemoveItem} onClick={onChangeActiveItem}/>
            </div>
            <div className="col-sm">
              <Map centerPoint={centerPoint} items={items} onChangeItemPoint={onChangeItemPoint}/>
            </div>
          </div>
        </div>;
}

export default App;