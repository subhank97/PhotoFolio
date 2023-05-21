import React from 'react';
import NewPost from './NewPost';
import PostList from './PostList';
import Button from 'react-bootstrap/Button';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile({ user, setUser, posts, setPosts }) {

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='profile'>
      <h1>
        {user.username ? `Welcome, ${user.full_name}!` : ''}
      </h1>
      <br></br>
      <div className='create-post'>
        <h4>Create New Post</h4>
        <NewPost setPosts={setPosts} user={user} posts={posts} />
      </div>
      <br></br>
      {posts && posts.length > 0 ? (
        <div className='your-posts'>
          <h2>Your Posts</h2>
          <PostList setPosts={setPosts} posts={posts} user={user} />
        </div>
      ) : (
        <div className='your-posts'>
          <h2>No Posts</h2>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Profile;
