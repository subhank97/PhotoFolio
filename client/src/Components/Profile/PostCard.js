import React, { useState } from 'react';
import PostDetail from './PostDetail';

function PostCard({ image, description, user, id, updatePosts }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <img className="py-1 hover:scale-small transition-all duration-800 cursor-pointer" src={image} alt='random' onClick={() => setOpenModal(true)}></img>
      <PostDetail
        id={id}
        user={user}
        image={image}
        description={description}
        open={openModal}
        onClose={() => setOpenModal(false)}
        updatePosts={updatePosts}
      />
    </div>
  );
}

export default PostCard;
