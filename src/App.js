import React, {useState, useCallback, useEffect} from 'react';
import uuid from 'uuid/v1';
import PointSearch from './components/PointSearch';
import PointList from './components/PointList';
import Map from './components/Map';
import {searchPoint} from './util';

function App() {
  const key = 'path-editor';
  const getItemsLocalStorage = () => localStorage.getItem(key) && JSON.parse(localStorage.getItem(key));
  const setItemsLocalStorage = (value) => localStorage.setItem(key, JSON.stringify(value));
  const initialItems = () => getItemsLocalStorage() || [];
  
  const [items, setItems] = useState(initialItems);
  const [value, setValue] = useState('');

  useEffect(() => {
    setItemsLocalStorage(items);
  }, [items]);

  const onRemove = useCallback((id) => {
    setItems(items.filter((item) => item.id !== id));
  }, [items]); 

  const onChange = useCallback(setValue, [value]);

  const onSubmit = useCallback(async () => {
    if (value) {
      const point = await searchPoint(value);
      if (point) {
        setItems(prevItems => {
          return [
            {
              id: uuid(),
              title: value,
              point
            },
            ...prevItems
          ]
        });
        setValue('');
      }
    }
  }, [value]);

  const onChangePoint = useCallback((id, point) => {
    setItems(prevItems => {
      return prevItems.map(item => item.id === id ? {...item, point} : item);
    })
  }, []);

  return <div className="container mt-5">
          <div className="row">
            <div className="col-sm">
              <PointSearch value={value} onChange={onChange} onSubmit={onSubmit}/>
              <PointList items={items} onRemove={onRemove}/>
            </div>
            <div className="col-sm">
              <Map items={items} onChangePoint={onChangePoint}/>
            </div>
          </div>
        </div>;
}

export default App;