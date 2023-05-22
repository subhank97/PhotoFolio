import React, { useState } from 'react';
import PostDetail from './PostDetail';

function PostCard({ image, description, user, id, setPosts }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className='post-card'>
      <img className='post-image' src={image} alt='random' onClick={() => setOpenModal(true)}></img>
      <PostDetail
        id={id}
        user={user}
        image={image}
        description={description}
        open={openModal}
        onClose={() => setOpenModal(false)}
        setPosts={setPosts} 
      />
    </div>
  );
}

export default PostCard;
