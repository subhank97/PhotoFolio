import React from 'react'

export default function PostDetail({ open,onClose, image, description}) {

    if(!open) return null

  return (
    <div onClick={onClose} className='overlay'>
    <div onClick={(e) => e.stopPropagation()}
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
        {/* <div className='btnContainer'>
          <button className='btnPrimary'>
            LIKE
          </button>
          <button className='btnOutline'>
            Comment
          </button>
        </div> */}
      </div>
    </div>
  </div>
  )
}
