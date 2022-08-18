import React from 'react'
import PostList from "./PostList";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function PostPage({ posts }) {
  return (
    <div>
      <div className='post-page'>
      <PostList posts={posts} />
      </div>
    </div>
  )
}

export default PostPage;