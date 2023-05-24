import React, { useState, useEffect, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import NavBar from './NavBar/NavBar';
import DiscoverPage from './DiscoverPage/DiscoverPage';
import Signup from './Signup';
import Profile from './Profile/Profile';

export const ThemeContext = createContext(null);

function HomePage() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    fetch('/posts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  useEffect(() => {
    fetch('/me', {
      credentials: 'include' 
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            setUser(user);
            setPosts(user.posts);
          });
        }
      });
  }, []);

  function handleLogin(newUser) {
    setUser(newUser);
    setUserPosts(newUser.posts); 
  }

  console.log(posts)

  return (
    <>
      <NavBar user={user} setUser={setUser} setPosts={setPosts} />
      <div className="container">
        <Routes>
          <Route exact path="/" element={<DiscoverPage user={user} />} />
          <Route
            exact
            path="/profile"
            element={<Profile setUser={setUser} user={user} posts={userPosts} setPosts={setUserPosts} />} // pass userPosts and setUserPosts here
          />
          <Route exact path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route exact path="/sign-up" element={<Signup setUser={setUser} />} />
        </Routes>
      </div>
    </>
  );
}

export default HomePage;
