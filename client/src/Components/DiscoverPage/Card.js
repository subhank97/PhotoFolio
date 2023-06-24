import React, { useState } from 'react';
import Detail from './Detail';

function Card({ item, user, comments, addComment, id, setComments, getComments, onImageLoad }) {
  const [openModal, setOpenModal] = useState(false);

  const images = item.download_url;
  const description = item.description;
  const member = item.author;

  const handleImageLoad = () => {
    if (onImageLoad) {
      onImageLoad();
    }
  };

  return (
    <div>
      <img onLoad={handleImageLoad} className="py-1 hover:scale-small transition-all duration-800 cursor-pointer" src={images} alt="random" onClick={() => setOpenModal(true)} />
      <Detail
        getComments={getComments}
        setComments={setComments}
        id={id}
        comments={comments}
        addComment={addComment}
        member={member}
        user={user}
        images={images}
        description={description}
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
}

export default Card;