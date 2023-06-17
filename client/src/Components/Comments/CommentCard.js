import React from 'react';

function CommentCard({ comment, setComments, comments }) {
  function handleDeleteComment(id) {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/comments/${id}`, {
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Credentials': 'true'
      },
      method: 'DELETE'
    })
      .then((resp) => resp.json())
      .then(data => {
        console.log(data);
        setComments(comments.filter(e => e.id !== data.id));
      });
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
