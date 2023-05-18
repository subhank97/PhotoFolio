import React from 'react'
import Button from 'react-bootstrap/Button';

export default function PostDetail({ open, onClose, image, description, user, id, setPosts, posts }) {

  function handleDeletePost(id){
    fetch(`/posts/${id}`, { 
      method: 'DELETE' 
    })
    .then((resp) => resp.json())
    .then(data=>{
      setPosts(posts.filter(e=> e.id !== data.id))
    })
  }

    if(!open) return null

  return (
    <div onClick={onClose} className='overlay'>
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className='modalContainer'
    >
      <img src={image} alt='/' />
      <div className='postModal'>
        <p className='closeBtn' onClick={onClose}>
          X
        </p>
        <h4>{user.full_name}</h4>
        <div className='content'>
          <p>{description}</p>
        </div>
          <div className='update-button'>
            <Button variant="outline-danger" onClick={() => handleDeletePost(id)}>Delete Post</Button>
        </div>
      </div>
    </div>
  </div>
  )
}
