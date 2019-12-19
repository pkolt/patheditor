import React, {useState, useMemo, useEffect, useCallback} from 'react';
import uuid from 'uuid/v1';
import SearchForm from './components/SearchForm';
import List from './components/List';
import Map from './components/Map';
import {searchPoint} from './util';

const moscowPoint = [55.75, 37.57];
const localStorageKey = 'path-editor';
const getItemsLocalStorage = () => localStorage.getItem(localStorageKey) && JSON.parse(localStorage.getItem(localStorageKey));
const setItemsLocalStorage = (value) => localStorage.setItem(localStorageKey, JSON.stringify(value));

function App() {
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
          ...prevItems,
          {
            id: uuid(),
            title: searchValue,
            point
          }
        ]);
        setSearchValue('');
      }
    }
  }, [searchValue]);

  const onChangeItemPoint = useCallback((id, point) => {
    setItems(prevItems => prevItems.map(item => item.id === id ? {...item, point} : item));
  }, []);

  const onChangeActiveItem = useCallback((id) => setActiveItemId(id), []);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = useCallback((result) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    setItems(prevItems => reorder(
      prevItems,
      result.source.index,
      result.destination.index
    ));
  }, []);

  return <div className="container mt-5">
    <div className="row">
      <div className="col-sm">
        <SearchForm value={searchValue} onChangeValue={onChangeSearchValue} onSubmit={onSubmit}/>
        <List items={items} onRemove={onRemoveItem} onClick={onChangeActiveItem} onDragEnd={onDragEnd}/>
      </div>
      <div className="col-sm">
        <Map centerPoint={centerPoint} items={items} onChangeItemPoint={onChangeItemPoint}/>
      </div>
    </div>
  </div>;
}

export default App;