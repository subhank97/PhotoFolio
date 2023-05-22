import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ handleLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();


    function handleSubmit(e) {
        e.preventDefault();
        fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password }),
        })
            .then((res) => {
                if (res.ok) {
                    res.json().then((user) => {
                        handleLogin(user);
                        navigate('/profile');
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

    // const signUpButton = document.getElementById('signUp');
    // const signInButton = document.getElementById('signIn');
    // const container = document.getElementById('container');
    
    // signUpButton.addEventListener('click', () => {
    //     container.classList.add("right-panel-active");
    // });
    
    // signInButton.addEventListener('click', () => {
    //     container.classList.remove("right-panel-active");
    // });

    return (
        // <>
        //     <h2>Weekly Coding Challenge #1: Sign in/up Form</h2>
        //     <div class="container" id="container">
        //         <div class="form-container sign-up-container">
        //             <form action="#">
        //                 <h1>Create Account</h1>
        //                 <div class="social-container">
        //                     <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
        //                     <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
        //                     <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
        //                 </div>
        //                 <span>or use your email for registration</span>
        //                 <input type="text" placeholder="Name" />
        //                 <input type="email" placeholder="Email" />
        //                 <input type="password" placeholder="Password" />
        //                 <button>Sign Up</button>
        //             </form>
        //         </div>
        //         <div class="form-container sign-in-container">
        //             <form action="#">
        //                 <h1>Sign in</h1>
        //                 <div class="social-container">
        //                     <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
        //                     <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
        //                     <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
        //                 </div>
        //                 <span>or use your account</span>
        //                 <input type="email" placeholder="Email" />
        //                 <input type="password" placeholder="Password" />
        //                 <a href="#">Forgot your password?</a>
        //                 <button>Sign In</button>
        //             </form>
        //         </div>
        //         <div class="overlay-container">
        //             <div class="overlay">
        //                 <div class="overlay-panel overlay-left">
        //                     <h1>Welcome Back!</h1>
        //                     <p>To keep connected with us please login with your personal info</p>
        //                     <button class="ghost" id="signIn">Sign In</button>
        //                 </div>
        //                 <div class="overlay-panel overlay-right">
        //                     <h1>Hello, Friend!</h1>
        //                     <p>Enter your personal details and start journey with us</p>
        //                     <button class="ghost" id="signUp">Sign Up</button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </>

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
                    Don't have an account <a href="/sign-up">sign up?</a>
                </p>
            </form>
        </div>
    );
}

export default Login;
