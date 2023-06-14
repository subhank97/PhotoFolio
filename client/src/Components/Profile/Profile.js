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

  console.log(user)
  console.log(posts)


  return (
    <div className="profile">
      <h1>{user.full_name ? ` ${user.full_name}` : ''}</h1>
      <br />
      <div className="create-post">
        <NewPost user={user} setProfilePosts={setPosts} />
      </div>
      <br />
      <div className="your-posts">
        {posts && posts.length > 0 ? (
          <>
            <h4>Your Posts</h4>
            <PostList posts={posts} user={user} updatePosts={setPosts} />
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
