import React from 'react';

function CommentCard({ comment, id, user, getComments, setComments, comments }) {
  function handleDeleteComment(id) {
    fetch(`/comments/${id}`, {
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
          <span>{comment} - {user}</span>
          <button className="delete-comment" onClick={() => handleDeleteComment(id)}>X</button>
        </div>
      </div>
    </div>
  );
}

export default CommentCard;