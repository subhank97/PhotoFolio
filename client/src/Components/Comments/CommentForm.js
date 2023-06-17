import React, { useState, useRef, useEffect } from 'react';
import CommentCard from './CommentCard';
import './Comment.css';

function CommentForm({ id, user, comments, addComment, setComments, getComments }) {
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');
  const [userNames, setUserNames] = useState({});

  const commentSectionRef = useRef(null);
  const lastCommentRef = useRef(null);


  const handleComment = (e) => {
    e.preventDefault();
    if (!user) {
      setError('Please log in to comment.');
      return;
    }

    fetch(`${process.env.REACT_APP_BACKEND_URL}/comments`, {
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

  const fetchUserNames = async () => {
    const uniqueUserIds = [...new Set(comments.map(comment => comment.user_id))];
    const newUserNames = {};
  
    for (let userId of uniqueUserIds) {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`);
      if (!response.ok) {
        console.log(`Failed to fetch user with ID ${userId}`);
        continue;
      }
      const user = await response.json();
      if (user) {
        newUserNames[userId] = user.full_name;
      } else {
        console.log(`User with ID ${userId} not found`);
      }
    }
  
    setUserNames(newUserNames);
  };

  useEffect(() => {
    fetchUserNames();
  }, [comments]);
  

  return (
    <div className="comment-section">
      <h5>Comments:</h5>
      <div className="comment-card" ref={commentSectionRef}>
        <div>
          {comments.map((comment, index) => (
            <div key={comment.id} ref={index === comments.length - 1 ? lastCommentRef : null}>
              <CommentCard
                setComments={setComments}
                id={comment.id}
                comment={comment.comment}
                user={userNames[comment.user_id] || 'Unknown User'}
                comments={comments}
              />
            </div>
          ))}
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
          />
          <input type="submit" name="submit" className="submit" value="Post" />
        </form>
      </div>
    </div>
  );
}

export default CommentForm;
