import React, { useEffect, useState } from 'react';
import NewPost from './NewPost';
import PostList from './PostList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Profile.css'

function Profile({ user, setUser }) {
  const [posts, setPosts] = useState([{}]);

  console.log(user)

  useEffect(() => {
    fetch('/posts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  // const updatePosts = () => {
  //   fetch('/posts')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setPosts(data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching updated posts:', error);
  //     });
  // };

  if (!user) {
    return <div>Loading...</div>;
  }

  // console.log(posts)

  return (
    <div className='profile'> 

      <h1>{user.username ? ` ${user.full_name}` : ''}</h1>

      <br />
      <div className='create-post'>
        <h4>Create New Post</h4>
        <NewPost user={user}  />
      </div>
      <br />
      {posts && posts.length > 0 ? (
        <>
          <h4>Your Posts</h4>
          <PostList posts={posts} user={user} setPosts={setPosts} />
        </>
      ) : (
        <p>No posts yet.</p>
      )}
      <ToastContainer />
    </div>
  );
}

export default Profile;
