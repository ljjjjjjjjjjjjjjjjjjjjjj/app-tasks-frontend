import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/actions';
import axios from 'axios';
import { RootAction } from '../store/actionTypes';
import { Dispatch } from 'redux';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const dispatch = useDispatch<Dispatch<RootAction>>();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', { email, password });
            dispatch(login(response.data));
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;