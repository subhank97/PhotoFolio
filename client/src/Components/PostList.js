import React from 'react'
import PostCard from './PostCard';

function PostList({ posts }) {

  return (
    <ul className="list">
      {posts.map((post) => {
        return (
          <PostCard
            key={post.id}
            image={post.image}
            description={post.description}
          />
        );
      })}
    </ul>
  )
}

export default PostList;