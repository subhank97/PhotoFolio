import React, { useState, useEffect } from 'react';
import List from './List';
import axios from 'axios';

function DiscoverPage({ user, comments, getComments, setComments }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const [imagesLoadedCount, setImagesLoadedCount] = useState(0);

  const handleImageLoad = () => {
    setImagesLoadedCount(imagesLoadedCount + 1);
    if (imagesLoadedCount >= data.length - 1) {
      setAllImagesLoaded(true);
    }
  };

  function addComment(newComment) {
    setComments((prevComments) => [...prevComments, newComment]);
  }

  useEffect(() => {
    getComments();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://picsum.photos/v2/list?page=3&limit=25');
        setData(response.data);
        window.onload = () => {
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {allImagesLoaded ? null :
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-gray-950 z-50 flex items-center justify-center">
          <div className="border-t-transparent border-solid animate-spin  rounded-full border-amber-400 border-8 h-64 w-64"></div>
        </div>
      }
      <List data={data} user={user} comments={comments} addComment={addComment} setComments={setComments} getComments={getComments} onImageLoad={handleImageLoad} />
    </>
  );
}

export default DiscoverPage;
