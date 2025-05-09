import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../../login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName,setFirstName] = useState('');
    const [lastName,SetLastName] = useState('');
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

                sessionStorage.setItem('token', token);

                setUserData(userData);
                navigate('/');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('❌ Wrong credentials!');
        }
    };

        const handleRegister = async (e) => {
            e.preventDefault();

            const params = {
                username: username,
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
            };

            try {
                const response = await axios.post('http://localhost:8082/auth/register', params);
                if (response.status === 200) {
                    console.log("Registration successful");
                    navigate('/login');
                } else {
                    setError('❌ Registration failed. Please try again.');
                }
            } catch (error) {
                console.error('Registration error:', error);
                setError('❌ Registration error. Please try again.');
            }
        };

    return (
        <div className="col-md-4">
            <div className="login-container">
                <a href="#" className="login-link">
                <div className="login-box">
                        {loginState === 'login' ? (
                            <div>
                                <h3>Login</h3>
                                <form onSubmit={handleLogin} className={"login-form"}>
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
                                {error && <p className="error-message">{error}</p>}
                                <p>Don't have an account? <a href="#" onClick={() => setLoginState('register')}>Register here</a></p>
                            </div>
                        ) : (
                            <div>
                                <h3>Register</h3>
                                 <form onSubmit={handleRegister} className={"login-form"}>                                    <input
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
                                     <input
                                         type="text"
                                         placeholder="First Name"
                                         value={firstName}
                                         onChange={(e) => setFirstName(e.target.value)}
                                         className="input-field"
                                     />
                                     <input
                                         type="text"
                                         placeholder="Last Name"
                                         value={lastName}
                                         onChange={(e) => SetLastName(e.target.value)}
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
