import React, { useState } from 'react';
import Modal from 'react-modal';
import CommentForm from '../Comments/CommentForm';
import Heart from 'react-animated-heart';


export default function ModalCard({ getComments, setComments, id, member, open, onClose, images, description, user, comments, addComment }) {
  const [like, setLike] = useState(false);

  return (
    <Modal isOpen={open} onRequestClose={onClose} className="fixed inset-0 z-10 flex items-center justify-center h-full overflow-y-auto">
      <div className="fixed inset-0  bg-slate-900 bg-opacity-75 transition-opacity"></div>
      <div className="relative w-4/5 md:max-w-lg lg:max-w-5xl h-auto text-white bg-zinc-800 shadow-lg sm:p-0">
        <div className="sm:flex sm:items-start">
          <img src={images} alt="/" className="w-3/4 h-full max-h-[600px] object-cover sm:w-4/6" />
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left sm:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <p onClick={onClose} className="absolute top-2 right-2 cursor-pointer">X</p>
              <h3 className="text-base font-semibold leading-6" id="modal-title">{member}</h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{description}</p>
              </div>
            </div>
            <div>
              <div className="like absolute bottom-4 left-4">
                <Heart className="heart" isClick={like} onClick={() => setLike(!like)} />
              </div>
              <div className="comments mt-4">
                <CommentForm setComments={setComments} id={id} user={user} comments={comments} addComment={addComment} getComments={getComments} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}