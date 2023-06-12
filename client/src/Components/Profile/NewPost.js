import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NewPost({ user, setProfilePosts }) {
  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user && imageFile) {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('description', description);
  
      fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${user.id}/posts`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error('Must be signed in');
          }
        })
        .then((newPost) => {
          console.log(newPost);
          setProfilePosts((prevPosts) => [newPost, ...prevPosts]);
          setImageFile(null);
          setDescription('');
          if (setProfilePosts) {
            setProfilePosts((prevPosts) => [newPost, ...prevPosts]);
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      toast.error('Please select an image and be logged in.');
    }
  };
  
  if (!user) {
    return <div>Please log in to create a new post.</div>;
  }

  return (
    <div className="post-form">
      <form onSubmit={handleSubmit}>
        <div className="image-form">
          <input id="image-upload" type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
          <label htmlFor="image-upload" className="upload-button">
            <span>Upload Image</span>
          </label>
        </div>
        <div className="article-description">
          <textarea
            rows={3}
            placeholder="Caption"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="article-form-button">
          <button type="submit">Create a Post</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default NewPost;
