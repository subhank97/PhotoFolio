import React, { useState, useEffect, useRef } from 'react';
import ModalCard from './ModalCard';

function Card({ item, user, comments, addComment, id, setComments, getComments, onImageLoad }) {
  const [openModal, setOpenModal] = useState(false);
  const [loaded, setLoaded] = useState(false);
  
  const imgRef = useRef();

  const images = item.download_url;
  const description = item.description;
  const member = item.author;

  const handleImageLoad = () => {
    if (onImageLoad) {
      onImageLoad();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        imgRef.current.src = images;
        observer.disconnect();
      });
    });
    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [images]);

  return (
    <div>
      <img ref={imgRef} onLoad={handleImageLoad} className="py-1 hover:scale-small transition-all duration-800 cursor-pointer" src={loaded ? images : null} alt="random" onClick={() => setOpenModal(true)} />
      <ModalCard
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
