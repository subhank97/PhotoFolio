import React, { useState } from 'react'
import { useNavigate } from 'react-router'

function Signup({ setUser }) {
    const [fullName, setFullName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    function onSubmit(e) {
    e.preventDefault()
        fetch('/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                full_name: fullName,
                username: username,
                password: password
            })
        })
            .then(res => {
                if (res.ok) {
                    res.json().then(user => {
                        setUser(user)
                        navigate('/profile')
                    })
                 }  
                 else {
                    res.json().then(json => setErrors(Object.entries(json.errors)))
                }
            })
            setFullName('')
            setUsername('')
            setPassword('')
         
    }
    

    return (
        <div className="sign-up">
        <form onSubmit={onSubmit}>
            <h3>Sign Up</h3>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e => setFullName(e.target.value))}
                />
            </div>
            <div className="mb-3">
                <input
                    type="username"
                    className="form-control"
                    placeholder="Username"
                    value={username}
                    onChange={(e => setUsername(e.target.value))}
                />
            </div>
            <div className="mb-3">
                <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e => setPassword(e.target.value))}
                />
            </div>
            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Sign Up
                </button>
            </div>
            <p className="forgot-password text-right">
                Already registered <a href="/login">sign in?</a>
            </p>
        </form>
        <div className='error'>
        {errors?errors.map(e => <div>{e[0]+': ' + e[1]}</div>):null}
        </div>
        </div>
  )
}

export default Signup