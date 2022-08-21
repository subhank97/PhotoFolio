import React, {useState} from 'react'
import Heart from "react-animated-heart";
import Button from 'react-bootstrap/Button';



export default function PostDetail({ open, onClose, image, description, user, id }) {

    function handleDelete(id){
        fetch(`/posts/${id}`, { 
          method: 'DELETE' 
        })
        .then(() => console.log())
        window.location.reload(false)
      }
  
  const [like, setLike] = useState(false)

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
          <div className='like'>
            <Heart isClick={like} onClick={() => setLike(!like)} /> 
          </div>
          <div className='delete-button'>
            <Button variant="danger" onClick={() => handleDelete(id)}>Delete Post</Button>
        </div>
      </div>
    </div>
  </div>
  )
}
