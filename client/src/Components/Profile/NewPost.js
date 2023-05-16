import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NewPost({ setPosts, user, addPosts }) {
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      fetch('/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: image,
          description: description,
          user_id: user.id,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error('Must be signed in');
          }
        })
        .then((res) => {
          addPosts(res);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      toast.error('You need to be logged in!');
    }
  };

  return (
    <div className="post-form">
        <form onSubmit={handleSubmit}>
            <div className="image-form">
                <input type="text" className="form-control" placeholder="Image " 
                       onChange={(e => setImage(e.target.value))} value={image}/>
            </div>
            <Form.Group className="article-description" controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" rows={3} placeholder="Description" 
             onChange={(e => setDescription(e.target.value))} value={description}/>
            </Form.Group>
            <div className="article-form-button">
            <Button type="submit" variant="secondary">Create</Button>
            </div>      
        </form>
    </div>
  )
  }

export default NewPost;