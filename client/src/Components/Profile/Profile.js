import React from 'react'
import NewPost from './NewPost';
import PostList from './PostList';

function Profile({ user, setUser, posts, setPost}) {

  console.log(posts)

function handleLogoutClick() {
  fetch("/logout", { 
    method: "DELETE" 
    })
      .then((r) => {
    if (r.ok) {
      setUser({});
      window.location.reload(false)
    }
  });
}

  return (
    <div className='profile'>
        <h1>
          {user && user.username ? `Welcome, ${user.full_name}!` : ""}
        </h1>
        {user && user.username ?  <button onClick={handleLogoutClick}>Logout</button> : ""}
        <br></br>
        <div>
          <h4>Create New Post</h4>
        <NewPost setPost={setPost} user={user} />
        </div>
        <br></br>
        <div>
          <h2>Your Posts</h2>
          <PostList posts={posts} />
        </div>
    </div>
  )
}

export default Profile;