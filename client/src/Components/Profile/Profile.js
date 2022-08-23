import React from 'react'
import NewPost from './NewPost';
import PostList from './PostList';
import Button from 'react-bootstrap/Button';

function Profile({ user, setUser, posts, setPosts}) {

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
        {user && user.username ?  <Button onClick={handleLogoutClick} variant="warning">Logout</Button> : ""}
        <br></br>
        <div className='create-post'>
          <h4>Create New Post</h4>
        <NewPost setPosts={setPosts} user={user} />
        </div>
        <br></br>
        <div className='your-posts'>
          <h2>Your Posts</h2>
          <PostList setPosts={setPosts} posts={posts} user={user}/>
        </div>
    </div>
  )
}

export default Profile;