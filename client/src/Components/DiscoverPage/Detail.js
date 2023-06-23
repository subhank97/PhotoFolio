import React, { useState } from 'react';
import Modal from 'react-modal';
import CommentForm from '../Comments/CommentForm';
import Heart from 'react-animated-heart';


export default function Detail({ getComments, setComments, id, member, open, onClose, images, description, user, comments, addComment }) {
  const [like, setLike] = useState(false);

  // console.log(user)

  return (
    <Modal isOpen={open} onRequestClose={onClose} contentLabel="Image Details" className="modalContainer" overlayClassName="overlay">
      <a href="#" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="/docs/images/blog/image-4.jpg" alt=""/>
          <div class="flex flex-col justify-between p-4 leading-normal">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
          </div>
      </a>
      {/* <img src={images} alt="/" />
      <div className="modalRight">
        <p className="closeBtn" onClick={onClose}>
          X
        </p>
        <h4>{member}</h4>
        <div className="content">
          <p>{description}</p>
        </div> 
        <div className="btnContainer">
          <div className="like">
            <Heart className="heart" isClick={like} onClick={() => setLike(!like)} />
          </div>
        </div>
        <div className="comments">
          <h5>Comments:</h5>
          <CommentForm setComments={setComments} id={id} user={user} comments={comments} addComment={addComment} getComments={getComments} />
        </div>
      </div> */}
    </Modal>
  );
}