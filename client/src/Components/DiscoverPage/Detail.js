import React, { useState } from 'react';
import Modal from 'react-modal';
import CommentForm from '../Comments/CommentForm';
import Heart from 'react-animated-heart';


export default function Detail({ getComments, setComments, id, member, open, onClose, images, description, user, comments, addComment }) {
  const [like, setLike] = useState(false);

  return (
    <Modal isOpen={open} onRequestClose={onClose} contentLabel="Image Details" className="modalContainer" overlayClassName="overlay">
      <img src={images} alt="/" />
      <div className="modalRight">
        <p className="closeBtn" onClick={onClose}>
          X
        </p>
        <h4>{member}</h4>
        {/* <div className="content">
          <p>{description}</p>
        </div> */}
        <div className="btnContainer">
          <div className="like">
            <Heart className="heart" isClick={like} onClick={() => setLike(!like)} />
          </div>
        </div>
        <div className="comments">
          {/* <h5>Comments:</h5> */}
          <CommentForm setComments={setComments} id={id} user={user} comments={comments} addComment={addComment} getComments={getComments} />
        </div>
      </div>
    </Modal>
  );
}