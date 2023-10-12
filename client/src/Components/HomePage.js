import React, { useState, useEffect, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import NavBar from './NavBar/NavBar';
import Signup from './Signup';
import Profile from './Profile/Profile';
import { useNavigate } from 'react-router-dom';
import Gallery from './Gallery/Gallery';
import About from './About';


export const ThemeContext = createContext(null);

function HomePage() {
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  const handleLogoutClick = () => {
    setIsLoggingOut(true);
    fetch("/users/sign_out.json", {
      method: "DELETE",
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Credentials': 'true'
      }
    })
      .then((response) => {
        if (response.ok) {
          setUser(null);
          setPosts([]);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("Error logging out:", error);
      })
      .finally(() => {
        setIsLoggingOut(false);
      });
  };

  return (
    <div className='w-full bg-slate-950'>
      <NavBar user={user} setUser={setUser} setPosts={setPosts} handleLogoutClick={handleLogoutClick}/>
      <div>
        <Routes>
          <Route exact path="/gallery" element={<Gallery user={user} getComments={getComments} setComments={setComments} comments={comments} />} />
          <Route exact path="/" element={<About/>} />
          <Route
            exact
            path="/profile"
            element={
              user ? (
                <Profile handleLogoutClick={handleLogoutClick} getComments={getComments} comments={comments} user={user} posts={posts} setPosts={setPosts} />
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
