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

  const backgroundImage = {
    backgroundImage: "linear-gradient(rgba(0, 0, 0.5, 1), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1564399580075-5dfe19c205f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXJ0JTIwZ2FsbGVyeXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
};

  return (
    <div className="flex justify-center items-center h-screen" style={backgroundImage}>
      <form onSubmit={onSubmit}>
      <div className="bg-white flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
          </svg>
          <input className="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div className="bg-white flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
          </svg>
          <input className="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className=" bg-white flex items-center border-2 py-2 px-3 rounded-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 " viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <input className="pl-2 outline-none border-none" type="password" name="" id="" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="block w-full bg-slate-900 mt-4 py-2 rounded-2xl text-amber-500 hover:text-amber-400 font-semibold mb-2">
          Sign up
        </button>
        <div className="text-center">
          <a href="/login" className="text-sm text-slate-500 hover:text-amber-500 cursor-pointer">Log in</a>
        </div>
      </form>
    </div>
  );
}

export default Signup;
