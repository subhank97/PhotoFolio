import React, {useState} from 'react'
import PostDetail from './PostDetail';

function PostCard({ image, description }) {

  const [openModal, setOpenModal] = useState(false)

  return (
    <div className='post-card'>
      <img className='post-image' src={image} alt='random' onClick={() => setOpenModal(true)}></img>
      <PostDetail image={image} description={description} open={openModal} onClose={() => setOpenModal(false)}/>
    </div>
  )
}

export default PostCard;