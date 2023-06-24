import React from 'react';

function CommentCard({ comment, setComments, comments }) {
  async function handleDeleteComment(id) {
    try {
      const response = await fetch(`/comments/${id}`, {
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
    <div className="bg-gray-200 p-4 rounded-lg space-y-2">
      <span className="font-bold">{comment.comment} - {comment.user.full_name}</span>
      <button onClick={() => handleDeleteComment(comment.id)} className="bg-transparent text-red-500 border-none rounded-full py-3 px-3 text-sm cursor-pointer hover:text-red-700 transition-colors">X</button>
    </div>
  );
}

export default CommentCard;
