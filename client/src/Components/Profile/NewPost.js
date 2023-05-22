import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NewPost({ user, updatePosts }) {
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
      formData.append('user_id', user.id);

      fetch('/posts', {
        method: 'POST',
        body: formData,
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error('Must be signed in');
          }
        })
        .then((res) => {
          updatePosts(); // Call the function to update posts in the parent component
          setImageFile(null);
          setDescription('');
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      toast.error('Please select an image and be logged in.');
    }
  };

  return (
    <div className="post-form">
      <form onSubmit={handleSubmit}>
        <div className="image-form">
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        <div className="article-description">
          <textarea
            rows={3}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="article-form-button">
          <button type="submit">Create</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default NewPost;
