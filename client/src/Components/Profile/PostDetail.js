import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function PostDetail({ open, onClose, image, description, user, id, updatePosts }) {

  function handleDeletePost(id) {
    fetch(`/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Access-Control-Allow-Credentials': 'true'
      }
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Error deleting post');
        }
      })
      .then(() => {
        updatePosts(prevPosts => prevPosts.filter(post => post.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting post:', error);
      });
  }

  return (
    <Modal isOpen={open} onRequestClose={onClose} className="post-detail-modalContainer" overlayClassName="post-detail-overlay">
      <img src={image} alt="Post" />
      <div className="post-detail-modalRight">
        <button className="post-detail-closeBtn" onClick={onClose}>
          X
        </button>
        <div className="post-detail-content">
          <h4>{user.full_name}</h4>
          <p>{description}</p>
        </div>
        <div className="post-detail-update-button">
          <button onClick={() => handleDeletePost(id)}>Delete Post</button>
        </div>
      </div>
    </Modal>
  );
}