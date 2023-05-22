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

  useEffect(() => {
    fetch('/me').then((r) => {
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
    setPosts(newUser.posts);
  }

  return (
    <>
      <NavBar user={user} setUser={setUser} setPosts={setPosts} />
      <div className="container">
        <Routes>
          <Route exact path="/" element={<DiscoverPage user={user} />} />
          <Route
            exact
            path="/profile"
            element={<Profile setUser={setUser} user={user} posts={posts} setPosts={setPosts} />}
          />
          <Route exact path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route exact path="/sign-up" element={<Signup setUser={setUser} />} />
        </Routes>
      </div>
    </>
  );
}

export default HomePage;
