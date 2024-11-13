import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoList from './components/Todo/TodoList';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Profile from './components/Profile/Profile';
import EditTodo from './components/Todo/EditTodo';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                
                <Route path="/profile" element={<Profile />} />
                <Route path="/edit/:id" element={<EditTodo />} />
                <Route path="/login/home" element={<TodoList />} />
            </Routes>
        </Router>
    );
}

export default App;
