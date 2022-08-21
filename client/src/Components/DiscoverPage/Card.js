import React, {useState, useEffect} from 'react'
import Detail from './Detail';

function Card({ item, user }) {

  const [openModal, setOpenModal] = useState(false)

  const images = item.urls.regular
  const description = item.description
  const member = item.user.name
  const id = item.id

  const [comments, setComments] = useState({})

  useEffect(() => {
    fetch("/comments")
    .then((res) => res.json())
    .then((comments) => setComments(comments))
  }, [])


  return (
  <div className='post-card'>
    <img className='post-image' src={images} alt='random' onClick={() => setOpenModal(true)}></img>
    <Detail setComments={setComments} member={member} user={user} id={id} images={images} description={description} open={openModal} onClose={() => setOpenModal(false)}/>
  </div>
  )
}

export default Card;