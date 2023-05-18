import React, { useState } from 'react';
import Detail from './Detail';

function Card({ item, user, comments, addComment, id, setComments, getComments }) {
  const [openModal, setOpenModal] = useState(false);

  const images = item.download_url;
  const description = item.description;
  const member = item.author;

  return (
    <div className="post-card">
      <img className="post-image" src={images} alt="random" onClick={() => setOpenModal(true)}></img>
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
