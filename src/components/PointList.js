import React from 'react';
import PropTypes from 'prop-types';
import PointListItem from './PointListItem';

const PointList = (props) => {
    const {items, onRemove} = props;
    return <ul className="list-group mt-2">
        {items.map(
            (item) => <PointListItem key={item.id} 
                                     title={item.title}
                                     onRemove={() => onRemove(item.id)}/>
        )}
    </ul>;
}

PointList.propTypes = {
    items: PropTypes.array,
    onRemove: PropTypes.func
};

PointList.defaultProps = {
    items: [],
    onRemove: () => {}
};

export default React.memo(PointList);