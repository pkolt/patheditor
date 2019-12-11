import React from 'react';
import PropTypes from 'prop-types';

const PointSearch = (props) => {
    const {value, onChange, onSubmit} = props;
    return <form onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}>
               <input className="form-control" 
                      type="text" 
                      placeholder="Введите новую точку маршрута и нажмите Enter" 
                      value={value}
                      onChange={(e) => onChange(e.target.value)}/>
           </form>;
}
PointSearch.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
};

PointSearch.defaultProps = {
    value: '',
    onChange: () => {},
    onSubmit: () => {}
};

export default React.memo(PointSearch);