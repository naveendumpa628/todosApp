import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                console.error('fetchProfile inside', localStorage.getItem('token'));
                const response = await api.get('/profile', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                setUser(response.data);
                setName(response.data.name);
                setEmail(response.data.email);
            } catch (err) {
                console.error('Error fetching profile:', err);
            }
        };
        fetchProfile();
    }, []);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const response = await api.put('/profile', { name, email, password }, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setUser(response.data);
            setError('Profile updated successfully');
        } catch (err) {
            setError('Error updating profile');
        }
    };

    return (
        <div>
            <h2>Profile</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleUpdateProfile}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
                />
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default Profile;
