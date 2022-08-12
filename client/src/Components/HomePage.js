import React from 'react'
import { Routes, Route } from 'react-router-dom';
import CreatePost from './CreatePosts';
import Login from './Login';
import NavBar from './NavBar';
import PostPage from './PostPage';
import Signup from './Signup';

function HomePage() {
  return (
      <div>
        <NavBar />
        <Routes>
            <Route exact path="/" element={<PostPage />} />
            <Route exact path="/new-post" element={<CreatePost />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/sign-up" element={<Signup />} />
        </Routes>
      </div>
  )
}

export default HomePage;