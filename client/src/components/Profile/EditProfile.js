import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const EditProfile = () => {
    const { user, logout } = React.useContext(AuthContext);
    const history = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch current profile data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('/profile', {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                });
                setName(response.data.name);
                setEmail(response.data.email);
            } catch (err) {
                console.error('Error fetching profile:', err);
            }
        };

        if (user?.token) {
            fetchProfile();
        }
    }, [user]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        // Basic password validation (optional)
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const updatedProfile = {
                name,
                email,
                password,
            };

            const response = await api.put('/profile', updatedProfile, {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            });

            setSuccessMessage('Profile updated successfully!');
            setPassword('');
            setConfirmPassword('');
        } catch (err) {
            setError('Error updating profile');
            console.error('Error updating profile:', err);
        }
    };

    return (
        <div>
            <h2>Edit Profile</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <form onSubmit={handleUpdateProfile}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        required
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter new password (leave blank to keep current)"
                    />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                    />
                </div>
                <button type="submit">Update Profile</button>
            </form>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default EditProfile;
