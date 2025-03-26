import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../../login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    let decodedToken = null;
    const [loginState, setLoginState] = useState('login');

    const handleLogin = async (e) => {
        e.preventDefault();

        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);
        params.append('grant_type', 'password');
        params.append('client_id', 'reactlogin');
        params.append('client_secret', '7H17aNsVu7HouXeEbhBa1CcFqhfWciCf');

        try {
            const response = await axios.post('http://localhost:8082/auth/login', params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            console.log("Received response:", response);

            if (response.status === 200) {
                const token = response.data.access_token;
                console.log("Received token:", token);

                decodedToken = jwtDecode(token);

                const userData = {
                    username: decodedToken.preferred_username || decodedToken.sub,
                    email: decodedToken.email || "No email available",
                    roles: decodedToken.roles || [],
                };

                sessionStorage.setItem('userdata', JSON.stringify(userData));
                sessionStorage.setItem('username', userData.username);
                sessionStorage.setItem('email', userData.email);

                setUserData(userData);
                navigate('/');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('❌ Wrong credentials!');
        }
    };

    const handleRegister = async (e) => {
    };

    return (
        <div className="col-md-4">
            <div className="four columns">
                <a href="#">
                    <div className="content-box color-effect-1">
                        {loginState === 'login' ? (
                            <div>
                                <h3>Login</h3>
                                <form onSubmit={handleLogin}>
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="input-field"
                                    />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="input-field"
                                    />
                                    <button type="submit" className="btn-submit">Login</button>
                                </form>
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                <p>Don't have an account? <a href="/register" onClick={() => setLoginState('register')}>Register here</a></p>
                            </div>
                        ) : (
                            <div>
                                <h3>Register</h3>
                                <form onSubmit={handleRegister}>
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="input-field"
                                    />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="input-field"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="input-field"
                                    />
                                    <button type="submit" className="btn-submit">Register</button>
                                </form>
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                <p>Already have an account? <a href="#" onClick={() => setLoginState('login')}>Login here</a></p>
                            </div>
                        )}
                    </div>
                </a>
            </div>
        </div>
    );
};

export default Login;
