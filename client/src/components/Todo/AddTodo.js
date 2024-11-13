import React, { useState } from 'react';
import { api } from '../../services/api';

const AddTodo = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/todos/createTodo', { title, description }, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setTitle('');
            setDescription('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            ></textarea>
            <button type="submit">Add Todo</button>
        </form>
    );
};

export default AddTodo;
