import React, { useState, useEffect } from 'react';
import List from './List';
import axios from 'axios';

function DiscoverPage({ user }) {
  const [data, setData] = useState([]);
  const [comments, setComments] = useState([]);

  function addComment(newComment) {
    setComments((prevComments) => [...prevComments, newComment]);
  }

  useEffect(() => {
    getComments();
  }, []);

  function getComments() {
    fetch("/comments", {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true'
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Error fetching comments');
        }
      })
      .then((resp) => setComments(resp))
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
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
    <>
      <List data={data} user={user} comments={comments} addComment={addComment} setComments={setComments} getComments={getComments} />
    </>
  );
}

export default DiscoverPage;
