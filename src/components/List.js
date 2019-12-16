import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';

const List = (props) => {
    const {items, onClick, onRemove} = props;
    return <ul className="list-group mt-2">
        {items.map(
            (item) => <ListItem key={item.id} 
                                     id={item.id}
                                     title={item.title}
                                     onClick={onClick}
                                     onRemove={onRemove}/>
        )}
    </ul>;
}

List.propTypes = {
    items: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
};

export default React.memo(List);