import React, { useState, useEffect, createContext } from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from './Profile/Login';
import NavBar from './NavBar/NavBar';
import DiscoverPage from './DiscoverPage/DiscoverPage';
import Signup from './Profile/Signup';
import Profile from './Profile/Profile';

export const ThemeContext = createContext(null)

function HomePage() {
  const [theme, setTheme] = useState("light")

const toggleTheme = () => {
  setTheme((curr) => (curr === "light" ? "light" : "dark"))
}

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
    <ThemeContext.Provider value={{ theme, toggleTheme }}> 
      <div id={theme}>
        <NavBar user={user}/>
        <Routes>
            <Route exact path="/" element={<DiscoverPage user={user} />} />
            <Route exact path="/profile" element={<Profile setUser={setUser} user={user} posts={posts} setPosts={setPosts}/>} />
            <Route exact path="/login" element={<Login handleLogin={handleLogin}/>} />
            <Route exact path="/sign-up" element={<Signup setUser={setUser}/>} />
        </Routes>
        {/* <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} /> */}
      </div>
      </ThemeContext.Provider>
  )
}

export default HomePage;