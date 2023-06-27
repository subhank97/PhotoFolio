import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login({ handleLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();


    function handleSubmit(e) {
        e.preventDefault();
        fetch("/users/sign_in.json", {
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

    const backgroundImage = {
        backgroundImage: "linear-gradient(rgba(0, 0, 0.5, 1), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1564399580075-5dfe19c205f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXJ0JTIwZ2FsbGVyeXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    };

    return (
        <div className="flex justify-center items-center h-screen" style={backgroundImage}>
            <form onSubmit={handleSubmit}>
                <div className="bg-white flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                    </svg>
                    <input className="pl-2 outline-none border-none" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className=" bg-white flex items-center border-2 py-2 px-3 rounded-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <input className="pl-2 outline-none border-none" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="block w-full bg-slate-900 mt-4 py-2 rounded-2xl text-amber-500 hover:text-amber-400 font-semibold mb-2">
                    Log in
                </button>
                <div className="text-center">
                    <Link to="/sign-up" className="text-sm text-slate-500 hover:text-amber-500 cursor-pointer">Register</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
