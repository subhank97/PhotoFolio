import React from 'react'

function PostCard({ image }) {
  return (
    <div>
      <img className='post-image' src={image} alt='random' onClick={() => console.log("clicked")}></img>
    </div>
  )
}

export default PostCard;