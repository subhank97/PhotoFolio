import React from 'react';
import PostCard from './PostCard';

function PostList({ posts, user, setPosts }) {
  const userPosts = posts.filter((post) => post.user_id === user.id);

  console.log(posts)

  return (
    <div>
      {userPosts.length > 0 ? (
        <ul className='post-list'>
          {userPosts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              image={post.image_url} 
              description={post.description}
              user={user}
              setPosts={setPosts}
            />
          ))}
        </ul>
      ) : (
        <p>No posts yet.</p>
      )}
    </div>
  );
}

export default PostList;
