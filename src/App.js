import React, {useState, useCallback} from 'react';
import uuid from 'uuid/v1';
import PointSearch from './components/PointSearch';
import PointList from './components/PointList';
import Map from './components/Map';
import {searchPoint} from './util';

function App() {
  const [items, setItems] = useState([]);
  const [value, setValue] = useState('');

  const onRemove = useCallback((id) => {
    setItems(items.filter((item) => item.id !== id));
  }, [items]);

  const onChange = useCallback(setValue, [value]);

  const onSubmit = useCallback(async () => {
    if (value) {
      const point = await searchPoint(value);
      if (point) {
        setItems([
          {
            id: uuid(),
            title: value,
            point
          },
          ...items
        ]);
        setValue('');
      }
    }
  }, [value]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm">
          <PointSearch value={value} onChange={onChange} onSubmit={onSubmit}/>
          <PointList items={items} onRemove={onRemove}/>
        </div>
        <div className="col-sm">
          <Map items={items}/>
        </div>
      </div>
    </div>
  );
}

export default App;