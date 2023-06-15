import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'

function Signup({ setUser }) {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();

    if (!fullName || !username || !password) {
      setError('Please fill in all fields');
      return;
    }

    fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true'
      },
      body: JSON.stringify({
        user: {
          full_name: fullName,
          username: username,
          password: password,
        },
      }),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((user) => {
            setUser(user);
            navigate(`/profile`);
          });
        } else {
          res.json().then((json) => setError(json.error));
        }
      })
      .catch((error) => {
        console.log('Error signing up:', error);
      });

    setFullName('');
    setUsername('');
    setPassword('');
  }

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
        <button type="submit" className="btn btn-primary">
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

