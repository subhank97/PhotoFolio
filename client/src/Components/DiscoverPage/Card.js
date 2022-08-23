import React, { useState } from 'react'
import Detail from './Detail';

function Card({ item, user, setComments, comments }) {

  const [openModal, setOpenModal] = useState(false)

  const images = item.urls.regular
  const description = item.description
  const member = item.user.name
  const id = item.id

  return (
  <div className='post-card'>
    <img className='post-image' src={images} alt='random' onClick={() => setOpenModal(true)}></img>
    <Detail comments={comments} setComments={setComments} member={member} user={user} id={id} images={images} description={description} open={openModal} onClose={() => setOpenModal(false)}/>
  </div>
  )
}

export default Card;