import React from 'react';
import PostCard from './PostCard';

function PostList({ posts, user, updatePosts }) {
  const userPosts = posts.filter((post) => post.user_id === user.id);

  // console.log(posts)

  return (
    <div className="pr-3 gap-2 columns-3">
      {userPosts.length > 0 ? (
        <>
          {userPosts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              image={post.image_url} 
              description={post.description}
              user={user}
              updatePosts={updatePosts}
            />
          ))}
        </>
      ) : (
        <p>No posts yet.</p>
      )}
    </div>
  );
}

export default PostList;
