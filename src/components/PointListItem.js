import React from 'react';
import PropTypes from 'prop-types';

const PointListItem = (props) => {
    const {title, onRemove} = props;
    return <li className="list-group-item">
                <div className="d-flex w-100 justify-content-between">
                    <span>{title}</span>
                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={onRemove}>Удалить</button>
                </div>
            </li>;
}

PointListItem.propTypes = {
    title: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired
};

export default React.memo(PointListItem);