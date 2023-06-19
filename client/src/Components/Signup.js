import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Signup({ setUser }) {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !username || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch("/users", {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify({
          user: {
            full_name: fullName,
            username: username,
            password: password,
          },
        }),
      });

      if (response.ok) {
        const user = await response.json();
        setUser(user);
        setFullName('');
        setUsername('');
        setPassword('');
        navigate(`/profile`);
      } else {
        const errorJson = await response.json();
        setError(errorJson.error);
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="signup">
      {error && <div className="error">{error}</div>}
      <form onSubmit={onSubmit}>
        <h3>Sign Up</h3>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={!fullName || !username || !password}>
          Sign Up
        </button>
        <p className="login-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
