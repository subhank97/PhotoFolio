import React from 'react'
import PostCard from './PostCard';

function PostList({ posts }) {

  return (
    <ul className="list">
      {Array.isArray(posts) ? 
      posts.map((post) => {
        return (
          <PostCard
            key={post.id}
            image={post.image}
            description={post.description}
          />
        );
      }) : null }
    </ul>
  )
}

export default PostList;