import React, {useState} from 'react'
// import Detail from './Detail';

function PostCard({ image, description }) {

  const [openModal, setOpenModal] = useState(false)

  return (
  <div className='post-card'>
    <img className='post-image' src={image} alt='random' onClick={() => setOpenModal(true)}></img>
    {/* <Detail  member={member} user={user} id={id} images={images} description={description} open={openModal} onClose={() => setOpenModal(false)}/> */}
  </div>
  )
}

export default PostCard;