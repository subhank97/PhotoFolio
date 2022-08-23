import React, {useState} from 'react'
// import Heart from "react-animated-heart";
import Button from 'react-bootstrap/Button';



export default function PostDetail({ open, onClose, image, description, user, id, setPosts }) {

    function handleDelete(id){
        fetch(`/posts/${id}`, { 
          method: 'DELETE' 
        })
        .then(() => console.log())
        window.location.reload(false)
      }

      // const handleUpdate = (e) => {
      //   e.preventDefault()
      //   fetch('/posts', {
      //           method: 'PATCH',
      //           headers: {
      //               "Content-Type": "application/json"
      //           },
      //           body: JSON.stringify({ 
      //             description: description, 
      //             user_id: user.id
      //       })
      //       })
      //   .then(res => res.json())
      //   .then(post => setPosts(post))
      // }

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
      <div className='modalRight'>
        <p className='closeBtn' onClick={onClose}>
          X
        </p>
        <h4>{user.full_name}</h4>
        <div className='content'>
          <p>{description}</p>
        </div>
          <div className='update-button'>
            {/* <Button variant="outline-info" onClick={() => handleUpdate(id)}>Edit Post</Button> */}
            <Button variant="outline-danger" onClick={() => handleDelete(id)}>Delete Post</Button>
        </div>
      </div>
    </div>
  </div>
  )
}
