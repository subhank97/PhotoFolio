import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function PostDetail({ open, onClose, image, description, user, id, setPosts, posts }) {
  function handleDeletePost(id) {
    fetch(`/posts/${id}`, {
      method: 'DELETE',
    })
      .then((resp) => resp.json())
      .then((data) => {
        setPosts(posts.filter((e) => e.id !== data.id));
      });
  }

  return (
    <Modal isOpen={open} onRequestClose={onClose} className='post-detail-modalContainer' overlayClassName='post-detail-overlay'>
      <img src={image} alt='Post' /> 
      <div className='post-detail-modalRight'>
        <button className='post-detail-closeBtn' onClick={onClose}>
          X
        </button>
        <div className='post-detail-content'>
          <h4>{user.full_name}</h4>
          <p>{description}</p>
        </div>
        <div className='post-detail-update-button'>
          <button onClick={() => handleDeletePost(id)}>
            Delete Post
          </button>
        </div>
      </div>
    </Modal>
  );
}
