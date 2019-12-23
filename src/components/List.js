import React from 'react';
import PropTypes from 'prop-types';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

let Item = (props) => {
    const {index, item: {id, title}, onClick, onRemove} = props;
    return <Draggable draggableId={id} index={index}>
        {(provided) => (
            <li className="list-group-item" data-testid="list-item" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                <div className="d-flex w-100 justify-content-between">
                    <a href="." onClick={(e) => {
                        e.preventDefault();
                        onClick(id);
                    }}>{title}</a>

                    <button type="button" 
                            data-testid="remove-button"
                            className="btn btn-outline-danger btn-sm" 
                            onClick={() => onRemove(id)}>Удалить</button>
                </div>
            </li>
        )}
    </Draggable>
};

Item.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
};

Item = React.memo(Item);

const List = (props) => {
    const {items, onClick, onRemove, onDragEnd} = props;
    return <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
        {(provided) => (
            <ul className="list-group mt-2" data-testid="list" ref={provided.innerRef} {...provided.droppableProps}>
                {items.map((item, index) => (
                    <Item key={item.id} index={index} item={item} onClick={onClick} onRemove={onRemove}/>
                ))}
                {provided.placeholder}
            </ul>
        )}
        </Droppable>
    </DragDropContext>
}

List.propTypes = {
    items: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onDragEnd: PropTypes.func.isRequired
};

export default React.memo(List);