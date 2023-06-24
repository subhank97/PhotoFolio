import React, { useState, useEffect, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import NavBar from './NavBar/NavBar';
import DiscoverPage from './DiscoverPage/DiscoverPage';
import Signup from './Signup';
import Profile from './Profile/Profile';

export const ThemeContext = createContext(null);

function HomePage() {
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    if (user) {
      fetch("/users-posts", {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Access-Control-Allow-Credentials': 'true'
        },
        redirect: 'follow'
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
    fetch("/current", {
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Credentials': 'true'
      }
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((user) => {
            setUser(user);
          });
        }
      });
  }, []);


  function handleLogin(newUser) {
    setUser(newUser);
  }

  function getComments() {
    fetch("/comments", {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true'
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Error fetching comments');
        }
      })
      .then((resp) => setComments(resp))
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  }

  return (
    <div className='w-full bg-slate-950'>
      <NavBar user={user} setUser={setUser} setPosts={setPosts} />
      <div>
        <Routes>
          <Route exact path="/" element={<DiscoverPage user={user} getComments={getComments} setComments={setComments} comments={comments} />} />
          <Route
            exact
            path="/profile"
            element={
              user ? (
                <Profile getComments={getComments} comments={comments} user={user} posts={posts} setPosts={setPosts} />
              ) : (
                <div>Loading...</div>
              )
            }
          />
          <Route exact path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route exact path="/sign-up" element={<Signup setUser={setUser} />} />
        </Routes>
      </div>
    </div>
  );
}

export default HomePage;
