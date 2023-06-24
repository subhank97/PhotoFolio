import React, { useState, useRef, useEffect } from 'react';
import CommentCard from './CommentCard';
import './Comment.css';

function CommentForm({ id, user, comments, addComment, setComments, getComments }) {
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  const commentSectionRef = useRef(null);
  const lastCommentRef = useRef(null);

  const handleComment = (e) => {
    e.preventDefault();
    if (!user) {
      setError('Please log in to comment.');
      return;
    }

    fetch("/comments", {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true'
      },
      body: JSON.stringify({
        comment: {
          comment: newComment,
          item_id: id,
        }
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

        if (lastCommentRef.current) {
          lastCommentRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  useEffect(() => {
    if (commentSectionRef.current) {
      commentSectionRef.current.scrollTop = commentSectionRef.current.scrollHeight;
    }
  }, [comments]);

  return (
    <div className="flex flex-col items-stretch max-w-lg mx-auto space-y-10">
      <h5 className="font-bold text-lg">Comments:</h5>
      <div className="flex-1 overflow-y-auto max-h-[300px] space-y-4" ref={commentSectionRef}>
        {comments.map((comment, index) => (
          <CommentCard
            key={comment.id}
            ref={index === comments.length - 1 ? lastCommentRef : null}
            setComments={setComments}
            comment={comment}
          />
        ))}
      </div>
      <div className="space-y-4">
        {error && <div>{error}</div>}
        <form onSubmit={handleComment} className="flex items-center space-x-4">
          <input
            type="text"
            name="comment"
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
            placeholder="Add a comment..."
            autoComplete="off"
            className="flex-grow border-none rounded py-2 px-4 mr-4"
          />
          <input type="submit" name="submit" className="py-2 px-4 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-700 transition-colors" value="Post" />
        </form>
      </div>
    </div>
  );
}

export default CommentForm;
