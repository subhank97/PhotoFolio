import React from 'react';
import { FaTrash } from 'react-icons/fa'

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
    <div className="border-b border-gray-600	 pb-1">
      <span className="font-bold">{comment.comment} - {comment.user.full_name}</span>
      <button onClick={() => handleDeleteComment(comment.id)} className=" absolute right-2 bg-transparent text-red-500 border-none rounded-full px-3 py-2 text-sm cursor-pointer hover:text-red-700 transition-colors">
      <FaTrash />
        </button>
    </div>
  );
}

export default CommentCard;
