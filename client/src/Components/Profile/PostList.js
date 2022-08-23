import React from 'react'
import PostCard from './PostCard';

function PostList({ posts, user, setPosts }) {

  return (
  <ul className="post-list">
    {Array.isArray(posts) ? 
    posts.map((post) => {
        return (
            <PostCard
                key={post.id}
                id={post.id}
                image={post.image}
                description={post.description}
                user={user}
                setPosts={setPosts}
                />
                );
                }) : null }
    </ul> 
  )}

export default PostList;