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
    if (user) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/posts`, {
        credentials: 'include',
        headers: {
          'Access-Control-Allow-Credentials': 'true'
        }
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('Server response:', data);
          setPosts(data);
        })
        .catch((error) => {
          console.error('Error fetching user posts:', error);
        });
    } else {
      console.log("No user");
    }
  }, [user]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/current`, {
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Credentials': 'true'
      }
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((user) => {
            setUser(user);
            console.log(user);
          });
        }
      });
  }, []);

  console.log(posts)

  function handleLogin(newUser) {
    setUser(newUser);
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
            element={
              user ? (
                <Profile user={user} posts={posts} setPosts={setPosts} />
              ) : (
                <div>Loading...</div>
              )
            }
          />
          <Route exact path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route exact path="/sign-up" element={<Signup setUser={setUser} />} />
        </Routes>
      </div>
    </>
  );
}

export default HomePage;
