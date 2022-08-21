import React, {useState} from 'react'
import CommentForm from '../Comments/CommentForm'
import Heart from "react-animated-heart";


export default function Detail({ setComments, member, open, onClose, images, description, id, user }) {
  
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
      <img src={images} alt='/' />
      <div className='modalRight'>
        <p className='closeBtn' onClick={onClose}>
          X
        </p>
        <h4>{member}</h4>
        <div className='content'>
          <p>{description}</p>
        </div>
        <div className='btnContainer'>
          <div className='like'>
            <Heart isClick={like} onClick={() => setLike(!like)} /> 
          </div>
        </div>
        <div className="comments">
        <CommentForm id={id} user={user} setComments={setComments}/>
        </div>
      </div>
    </div>
  </div>
  )
}
