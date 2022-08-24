import React from 'react'
import PostCard from './PostCard';

function PostList({ posts, user, setPosts }) {

  return (
    <div>
      {user ?
        <ul className="post-list">
          {posts.map((post) => {
            return (
              <PostCard
                key={post.id}
                id={post.id}
                image={post.image}
                description={post.description}
                posts={posts.filter(post => post.user_id === user.id)}
                user={user}
                setPosts={setPosts}
              />
            );
          })}
        </ul>
        :
        null
      }
    </div>
  )
}

export default PostList;