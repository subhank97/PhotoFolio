import React, {useState} from 'react'
import CommentForm from '../CommentForm'
import Heart from "react-animated-heart";


export default function PostDetail({ open,onClose, image, description}) {
  const [comment, setComment] = useState("")
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
        <div className='content'>
          <p>{description}</p>
        </div>
        <div className='btnContainer'>
          <div>
            <Heart isClick={like} onClick={() => setLike(!like)} /> 
          </div>
          {/* <button className='btnPrimary' onClick={() => setLike((prevLike) => !prevLike)}>
            <span className='bold'>{like ? "❤️" : "🖤"}</span>
          </button> */}
        </div>
        <CommentForm />
      </div>
    </div>
  </div>
  )
}
