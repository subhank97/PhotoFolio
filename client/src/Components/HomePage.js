import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from './Profile/Login';
import NavBar from './NavBar/NavBar';
import DiscoverPage from './DiscoverPage/DiscoverPage';
import Signup from './Profile/Signup';
import Profile from './Profile/Profile';

function HomePage() {
  const [user, setUser] = useState({
    "comments": [],
    "full_name": "",
    "id": "",
    "password": "",
    "posts": [],
    "username": ""
  });
  const [posts, setPosts] = useState(user.posts)

  useEffect(() => {
    fetch('/me').then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)
          setPosts(user.posts)
        });
      }
    });
  }, []);  

  function handleLogin(newUser){
    setUser(newUser)
    setPosts(newUser.posts)
  }

  return (
      <div>
        <NavBar user={user}/>
        <Routes>
            <Route exact path="/" element={<DiscoverPage user={user} />} />
            <Route exact path="/profile" element={<Profile setUser={setUser} user={user} posts={posts} setPosts={setPosts}/>} />
            <Route exact path="/login" element={<Login handleLogin={handleLogin}/>} />
            <Route exact path="/sign-up" element={<Signup setUser={setUser}/>} />
        </Routes>
      </div>
  )
}

export default HomePage;