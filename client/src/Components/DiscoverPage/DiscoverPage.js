import React, { useState, useEffect } from 'react'
// import CommentForm from '../Comments/CommentForm';
import List from "./List";
import axios from 'axios';


function DiscoverPage({ user }) {
  const [data, setData] = useState([])
  const [comments, setComments] = useState([])

  function addComment(newComment) {
    setComments([...comments, newComment])
  }

  useEffect(() => {
    getComments()
  }, [])

  function getComments() {
    fetch("/comments")
      .then((res) => res.json())
      .then((resp) => setComments(resp))
  }


  // useEffect(() => {
  //   fetch(`https://api.unsplash.com/search/photos?page=1&per_page=100&query=random&client_id=${process.env.REACT_APP_API_KEY}`,)
  //     .then((res) => res.json())
  //     .then((data) => setData(data.results))
  // }, [])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://picsum.photos/v2/list?page=2&limit=50');
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  //console.log(data)

  return (
    <div>
      <div className='post-page'>
       <List data={data} user={user} comments={comments} addComment={addComment}
          setComments={setComments} getComments={getComments} />
      </div>
    </div>
  ) 
}

export default DiscoverPage;