import React from 'react';
import PropTypes from 'prop-types';

const PointSearch = (props) => {
    const {value, onChangeValue, onSubmit} = props;
    return <form data-testid="search-form" onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}>
               <input data-testid="search-input"
                      className="form-control" 
                      type="text" 
                      placeholder="Введите новую точку маршрута и нажмите Enter" 
                      value={value}
                      onChange={(e) => onChangeValue(e.target.value)}/>
           </form>;
}
PointSearch.propTypes = {
    value: PropTypes.string.isRequired,
    onChangeValue: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default React.memo(PointSearch);