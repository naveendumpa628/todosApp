import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    console.log("Client side Login ")
    const { login } = useContext(AuthContext);
    const navigate = useNavigate(); // We now use it here
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Client side Login befor API")
            const response = await api.post('/auth/login', { email, password });
            console.log("---", response)
            console.log("Client side Login after API")
            
            login(response.data.token); // Call login to store the token
            localStorage.setItem('token',response.data.token )
            navigate('/login/home'); // Navigate to the home page after successful login
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
