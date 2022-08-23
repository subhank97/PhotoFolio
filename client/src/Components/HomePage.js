import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from './Profile/Login';
import NavBar from './NavBar/NavBar';
import DiscoverPage from './DiscoverPage/DiscoverPage';
import Signup from './Profile/Signup';
import Profile from './Profile/Profile';

function HomePage() {
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/posts")
    .then((res) => res.json())
    .then((posts) => setPosts(posts))
  }, [])

  useEffect(() => {
    fetch('/me').then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);  

  return (
      <div>
        <NavBar user={user}/>
        <Routes>
            <Route exact path="/" element={<DiscoverPage user={user} />} />
            <Route exact path="/profile" element={<Profile  posts={posts} setPosts={setPosts} setUser={setUser} user={user}/>} />
            <Route exact path="/login" element={<Login setUser={setUser}/>} />
            <Route exact path="/sign-up" element={<Signup setUser={setUser}/>} />
        </Routes>
      </div>
  )
}

export default HomePage;