import React from 'react'

function PostCard({ image }) {


  return (
    <div className='posts'>
      <img src={image} alt='random' onClick={() => console.log("clicked")}></img>
    </div>
  )
}

export default PostCard;