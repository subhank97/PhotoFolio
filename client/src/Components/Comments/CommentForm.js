import React, { useState, useEffect } from 'react'
import CommentCard from './CommentCard';

function CommentForm({ id, user, setComments }){
const [newComment, setNewComment] = useState("")
const[errors, setErrors] = useState([])

console.log(id)

const handleSubmit = (e) => {
  e.preventDefault()
  fetch("/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      comment: newComment, 
      post_id: id,
      user_id: user.id
    })
  }).then((res) => {
    if (res.ok) {
    res.json().then((data) => setComments(data))
  } else {
    res.json().then((err) => setErrors(err.errors));
  }})
}

const comments = newComment.comment

  return (
    <div className='comment-form'>
        <form onSubmit={handleSubmit}>
            <input
                className='comment-input'
                type="text"
                name="comment"
                onChange={(e => setNewComment(e.target.value))} 
                value={comments}
                placeholder="Add a comment..."
            /> {" "}
            <input type="submit" name="submit"  className="submit" />
            <br></br>
            <br></br>
            <CommentCard comment={newComment} user={user}/>
        </form>
    </div>
  )
}

export default CommentForm;