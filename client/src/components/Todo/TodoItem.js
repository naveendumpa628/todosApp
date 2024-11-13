import React from 'react';

const TodoItem = ({ todo }) => {
    return (
        <div>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <p>Status: {todo.status}</p>
        </div>
    );
};

export default TodoItem;
