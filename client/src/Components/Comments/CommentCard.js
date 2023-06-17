import React from 'react';

function CommentCard({ comment, setComments, comments }) {
  async function handleDeleteComment(id) {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/comments/${id}`, {
        credentials: 'include',
        headers: {
          'Access-Control-Allow-Credentials': 'true'
        },
        method: 'DELETE'
      });

      if (response.ok) {
        setComments((prevComments) => prevComments.filter((c) => c.id !== id));
      } else {
        console.error('Error deleting the comment');
      }
    } catch (error) {
      console.error('Error deleting the comment:', error);
    }
  }

  return (
    <div>
      <div className="comment-card">
        <div>
          <span>{comment.comment} - {comment.user.full_name}</span>
          <button className="delete-comment" onClick={() => handleDeleteComment(comment.id)}>X</button>
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
