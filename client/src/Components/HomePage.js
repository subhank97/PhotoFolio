import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import NavBar from './NavBar';
import PostPage from './PostPage';
import Signup from './Signup';
import Profile from './Profile';

function HomePage() {

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    fetch('/me').then((r) => {
      if (r.ok) {
        r.json().then((currentUser) => setCurrentUser(currentUser));
      }
    });
  }, []);

  const updateUser = (user) => setCurrentUser(user)

  return (
      <div>
        <NavBar />
        <Routes>
            <Route exact path="/" element={<PostPage />} />
            <Route exact path="/profile" element={<Profile setUser={setCurrentUser} user={currentUser}/>} />
            <Route exact path="/login" element={<Login updateUser={updateUser}/>} />
            <Route exact path="/sign-up" element={<Signup updateUser={updateUser}/>} />
        </Routes>
      </div>
  )
}

export default HomePage;