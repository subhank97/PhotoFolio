import React from 'react'
import NewPost from './NewPost'

function Profile({ user, setUser, setPost}) {

  console.log(user)

function handleLogoutClick() {
  fetch("/logout", { 
    method: "DELETE" 
    })
      .then((r) => {
    if (r.ok) {
      setUser({});
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
    </div>
  )
}

export default Profile;