import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                console.log("inside TodoList");
                console.log("inside TodoList token", localStorage.getItem('token'));
                const response = await api.get('/todos/getTodos', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                setTodos(response.data);
            } catch (err) {
               console.error(err);
           }
        };

        fetchTodos();
    }, []);

    return (
        <div>
            <h1>Your Todo List</h1>
            <AddTodo />
            {todos.map(todo => (
                <TodoItem key={todo._id} todo={todo} />
            ))}
        </div>
    );
};

export default TodoList;
