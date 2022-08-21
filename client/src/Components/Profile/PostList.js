import React from 'react'
import PostCard from './PostCard';

function PostList({ posts, user }) {

  return (
  <ul className="list">
    {Array.isArray(posts) ? 
    posts.map((post) => {
        return (
            <PostCard
                key={post.id}
                id={post.id}
                image={post.image}
                description={post.description}
                user={user}
                />
                );
                }) : null }
    </ul> 
  )}

export default PostList;