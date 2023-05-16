import React, { useState } from 'react';
import CommentCard from './CommentCard';

function CommentForm({ id, user, comments, addComment, setComments, getComments }) {
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  const handleComment = (e) => {
    e.preventDefault();
    if (!user) {
      setError('Please log in to comment.');
      return;
    }

    fetch('/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comment: newComment,
        user_id: user.id,
        item_id: id,
      }),
    })
      .then((res) => {
        if (res.status === 401) {
          setError('User not logged in');
          throw new Error('User not logged in');
        }
        return res.json();
      })
      .then((newComment) => {
        addComment(newComment);
        setNewComment('');
        setError('');
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  return (
    <div className="comment-section">
      <h5>Comments:</h5>
      <div className="comment-card">
        <div>
          {comments.map((comment) => {
            return (
              <div key={comment.id}>
                <CommentCard
                  setComments={setComments}
                  id={comment.id}
                  comment={comment.comment}
                  user={comment.user.full_name}
                  comments={comments}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="comment-form">
        {error && <div>{error}</div>}
        <form onSubmit={handleComment}>
          <input
            type="text"
            name="comment"
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
            placeholder="Add a comment..."
            autoComplete="off"
          />{' '}
          <input type="submit" name="submit" className="submit" />
        </form>
      </div>
    </div>
  );
}

export default CommentForm;