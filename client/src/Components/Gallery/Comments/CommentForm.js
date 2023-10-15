import React, { useState, useRef, useEffect } from 'react';
import CommentCard from './CommentCard';

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
    <div className="flex flex-col items-stretch">
      <h5 className="font-bold text-lg">Comments:</h5>
      <div className="overflow-y-auto max-h-[215px] max-w-[315px] flex-grow sm:max-w-xl" ref={commentSectionRef}>
        {comments.map((comment, index) => (
          <CommentCard
            key={comment.id}
            ref={index === comments.length - 1 ? lastCommentRef : null}
            setComments={setComments}
            comment={comment}
          />
        ))}
      </div>
      <div className="mt-4 flex-grow absolute bottom-5">
        {error && <div>{error}</div>}
        <form onSubmit={handleComment} className="flex items-center space-x-2">
          <input
            type="text"
            name="comment"
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
            placeholder="Add a comment..."
            autoComplete="off"
            className="flex-grow border text-black border-gray-300 rounded py-2 px-4 mr-2"
          />
          <input type="submit" name="submit" className="py-1 px-2 bg-slate-950 text-white rounded cursor-pointer hover:bg-amber-500 transition-colors" value="Post" />
        </form>
      </div>
    </div>
  );
}

export default CommentForm;
