import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login({ handleLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();


    function handleSubmit(e) {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_BACKEND_URL}/users/sign_in.json`, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify({ user: { username: username, password: password } }),
        })
            .then((res) => {
                if (res.ok) {
                    res.json().then((user) => {
                        handleLogin(user);
                        navigate(`/profile`);
                        console.log(user);
                    });
                } else {
                    res.json().then((data) => {
                        setErrors(data.errors || ['Invalid username or password.']);
                    });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setErrors(['An unexpected error occurred.']);
            });
    }

    return (
        <div className="login">
            {errors.length > 0 && (
                <div className="error">
                    {errors.map((error, index) => (
                        <div key={index}>{error}</div>
                    ))}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <h3>Sign In</h3>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
                <p className="forgot-password text-right">
                    Don't have an account <Link href="/sign-up">sign up?</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
