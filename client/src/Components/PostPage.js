import { useState, useEffect } from "react"
import React from 'react'
import PostList from "./PostList";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function PostPage() {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch("/posts")
      .then((r) => r.json())
      .then((posts) => {
        setPosts(posts);
      });
  }, []);

  return (
    <div>
      <div className="search-box">
        <Form className="d-flex">
          <Form.Control 
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
      </div >
      <div className='post-page'>
      <PostList posts={posts} />
      </div>
    </div>
  )
}

export default PostPage;