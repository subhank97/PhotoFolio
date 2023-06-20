import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function NewPost({ user, setProfilePosts }) {

  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      toast.success("Image selected");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user && imageFile) {
      const formData = new FormData();
      formData.append('post[image]', imageFile);
      formData.append('post[description]', description);
  
      fetch("/posts", {
        method: 'POST',
        body: formData,
        credentials: 'include',
        headers: {
          'Access-Control-Allow-Credentials': 'true'
        }
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error('Must be signed in');
          }
        })
        .then((newPost) => {
          console.log('New post:', newPost);
          setProfilePosts((prevPosts) => {
            if (Array.isArray(prevPosts)) {
              return [newPost, ...prevPosts];
            } else {
              console.error('prevPosts is not an array:', prevPosts);
              return [newPost];
            }
          });
          setImageFile(null);
          setDescription('');
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      toast.error('Image or caption value empty');
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
            <span>Select image</span>
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
