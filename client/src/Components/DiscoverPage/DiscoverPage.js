import React, { useState, useEffect } from 'react';
import List from './List';
import axios from 'axios';
import './Discoverpage.css'

function DiscoverPage({ user }) {
  const [data, setData] = useState([]);
  const [comments, setComments] = useState({});

  function addComment(newComment) {
    setComments((prevComments) => ({
      ...prevComments,
      [newComment.id]: newComment,
    }));
  }

  useEffect(() => {
    getComments();
  }, []);

  function getComments() {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/comments`)
      .then((res) => res.json())
      .then((resp) => setComments(resp));
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://picsum.photos/v2/list?page=3&limit=25');
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="post-page">
      <List data={data} user={user} comments={comments} addComment={addComment} setComments={setComments} getComments={getComments} />
    </div>
  );
}

export default DiscoverPage;