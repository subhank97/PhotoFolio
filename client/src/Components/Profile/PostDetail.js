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
  //   <Modal isOpen={open} onRequestClose={onClose} className="post-detail-modalContainer" overlayClassName="post-detail-overlay">
  //   <img src={image} alt="Post" />
  //   <div className="post-detail-modalRight">
  //     <button className="post-detail-closeBtn" onClick={onClose}>
  //       X
  //     </button>
  //     <div className="post-detail-content">
  //       <h4>{user.full_name}</h4>
  //       <p>{description}</p>
  //     </div>
  // <div className="post-detail-update-button">
  //   <button onClick={() => handleDeletePost(id)}>Delete Post</button>
  // </div>
  //   </div>
  // </Modal>
  return (
    <Modal isOpen={open} onRequestClose={onClose} className="fixed inset-0 z-10 flex items-center justify-center h-full overflow-y-auto">
      <div className="fixed inset-0  bg-slate-900 bg-opacity-75 transition-opacity"></div>
      <div className="relative w-4/5 md:max-w-lg lg:max-w-5xl h-auto text-white bg-zinc-800 shadow-lg sm:p-0">
        <div className="sm:flex sm:items-start">
          <img src={image} alt="/" className="w-3/4 h-full max-h-[600px] object-cover sm:w-4/6" />
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left sm:w-1/2 pt-3 flex flex-col justify-between">
            <div>
              <p onClick={onClose} className="absolute top-2 right-2 cursor-pointer">X</p>
              <h3 className="pb-5 text-base font-semibold leading-6" id="modal-title">{user.full_name}</h3>
              <div className="text-center py-40 px">
                <p className="text-sm text-gray-200">{description}</p>
              </div>
            </div>
            <div className="w-fit border ml-52 mt-16 p-2 hover:bg-amber-400">
              <button onClick={() => handleDeletePost(id)}>Delete Post</button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}