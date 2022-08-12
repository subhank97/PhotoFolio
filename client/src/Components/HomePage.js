import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreatePost from './CreatePosts';
import NavBar from './NavBar';
import PostPage from './PostPage';

function HomePage() {
  return (
      <div>
        <NavBar />
        <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<PostPage />} />
            <Route exact path="/new-post" element={<CreatePost />} />
        </Routes>
        </BrowserRouter>
      </div>
  )
}

export default HomePage;