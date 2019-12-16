import React from 'react';
import PropTypes from 'prop-types';

const ListItem = (props) => {
    const {id, title, onClick, onRemove} = props;
    return <li className="list-group-item">
                <div className="d-flex w-100 justify-content-between">
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        onClick(id);
                    }}>{title}</a>
                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => onRemove(id)}>Удалить</button>
                </div>
            </li>;
}

ListItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
};

export default React.memo(ListItem);