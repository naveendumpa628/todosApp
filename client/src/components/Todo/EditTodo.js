import React, { useState, useEffect } from 'react';
import { useNavigate , useParams } from 'react-router-dom';
import { api } from '../../services/api';

const EditTodo = () => {
    const { id } = useParams();
    const history = useNavigate();
    const [todo, setTodo] = useState({ title: '', description: '', status: '' });

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const response = await api.get(`/todos/${id}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                setTodo({
                    title: response.data.title,
                    description: response.data.description,
                    status: response.data.status
                });
            } catch (err) {
                console.error('Error fetching todo:', err);
            }
        };

        fetchTodo();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/todos/${id}`, todo, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
          //  history.push('/');
          history('/');
        } catch (err) {
            console.error('Error updating todo:', err);
        }
    };

    return (
        <div>
            <h2>Edit Todo</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={todo.title}
                    onChange={(e) => setTodo({ ...todo, title: e.target.value })}
                    placeholder="Title"
                    required
                />
                <textarea
                    value={todo.description}
                    onChange={(e) => setTodo({ ...todo, description: e.target.value })}
                    placeholder="Description"
                ></textarea>
                <select
                    value={todo.status}
                    onChange={(e) => setTodo({ ...todo, status: e.target.value })}
                >
                    <option value="pending">Pending</option>
                    <option value="in progress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="completed">Completed</option>
                </select>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditTodo;
