import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import NavBar from './NavBar/NavBar';
import PostPage from './DiscoverPage/PostPage';
import Signup from './Signup';
import Profile from './Profile';

function HomePage() {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/posts")
    .then((res) => res.json())
    .then((posts) => setPosts(posts))
  }, [isLoading])

  useEffect(() => {
    fetch('/me').then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);  

  return (
      <div>
        <NavBar />
        <Routes>
            <Route exact path="/" element={<PostPage posts={posts} />} />
            <Route exact path="/profile" element={<Profile setPost={setPosts} setUser={setUser} user={user}/>} />
            <Route exact path="/login" element={<Login setUser={setUser}/>} />
            <Route exact path="/sign-up" element={<Signup setUser={setUser}/>} />
        </Routes>
      </div>
  )
}

export default HomePage;