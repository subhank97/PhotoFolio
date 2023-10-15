import React, { useState } from 'react';
import Modal from 'react-modal';
import CommentForm from './Comments/CommentForm';
import Heart from 'react-animated-heart';


export default function ModalCard({ getComments, setComments, id, member, open, onClose, images, description, user, comments, addComment }) {
  const [like, setLike] = useState(false);

  return (
    <Modal isOpen={open} onRequestClose={onClose} className="fixed inset-0 z-10 flex items-center justify-center h-full overflow-y-auto">
      <div className="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity"></div>
      <div className="relative w-4/5 md:max-w-lg lg:max-w-5xl mx-auto h-auto text-white bg-zinc-800 shadow-lg sm:p-0">
        <p onClick={onClose} className="absolute top-2 right-2 cursor-pointer z-50">X</p>
        <div className="flex flex-col md:flex-row">
          <div className="relative">
            <img src={images} alt="/" className="w-full h-full object-cover sm:w-full sm:h-auto md:h-auto max-h-[650px]" />
            <div className="like absolute bottom-4 left-4">
              <Heart className="heart" isClick={like} onClick={() => setLike(!like)} />
            </div>
          </div>
          <div className="md:w-1/2 flex flex-col justify-between p-4">
            <h3 className="text-base font-semibold leading-6 text-center md:text-left" id="modal-title">{member}</h3>
            <div className="mt-4 md:mt-0 flex-grow overflow-auto">
              <p className="text-sm text-gray-500">{description}</p>
              <div className="self-end mt-8 lg:mt-20">
                <CommentForm setComments={setComments} id={id} user={user} comments={comments} addComment={addComment} getComments={getComments} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}