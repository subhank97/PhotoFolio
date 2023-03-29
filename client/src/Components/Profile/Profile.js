import React, { useState, useEffect } from 'react'
import NewPost from './NewPost';
import PostList from './PostList';
import Button from 'react-bootstrap/Button';
import { Navigate, useNavigate } from 'react-router-dom';

function Profile({ user, setUser, posts, setPosts }) {
  function addPosts(newPost) {
    setPosts([...posts, newPost])
  }

  const navigate = useNavigate()

  function handleLogoutClick() {
    fetch("/logout", {
      method: "DELETE"
    })
      .then((r) => {
        if (r.ok) {
          setUser({
            "comments": [],
            "full_name": "",
            "id": "",
            "password": "",
            "posts": [],
            "username": ""
          });
          navigate("/login")
        }
      });
  }

  return (
    <div className='profile'>
      <h1>
        {user && user.username ? `Welcome, ${user.full_name}!` : ""}
      </h1>
      {user && user.username ? <Button onClick={handleLogoutClick} variant="warning">Logout</Button> : ""}
      <br></br>
      <div className='create-post'>
        <h4>Create New Post</h4>
        <NewPost setPosts={setPosts} user={user} addPosts={addPosts} />
      </div>
      <br></br>
      {user.posts.length > 0 ?
        (<div className='your-posts'>
          <h2>Your Posts</h2>
          <PostList setPosts={setPosts} posts={posts} user={user} />
        </div>)
        :
        (<div className='your-posts'>
          <h2>No Posts</h2>
        </div>)
      }

    </div>
  )
}

export default Profile;