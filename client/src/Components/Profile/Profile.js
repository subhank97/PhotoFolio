import React from 'react';
import NewPost from './NewPost';
import PostList from './PostList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Profile.css';

function Profile({ user, posts, setPosts }) {

  

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <h1>{user.username ? ` ${user.full_name}` : ''}</h1>
      <br />
      <div className="create-post">
        {/* <h4>Create New Post</h4> */}
        <NewPost user={user} setPosts={setPosts} />
      </div>
      <br />
      <div className='your-posts'>
      {posts && posts.length > 0 ? (
        <>
          <h4>Your Posts</h4>
          <PostList posts={posts} user={user} setPosts={setPosts} />
        </>
      ) : (
        <p>No posts yet.</p>
      )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Profile;
