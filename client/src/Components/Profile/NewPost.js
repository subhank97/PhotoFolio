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
  //   <div className="post-form">
  //   <form onSubmit={handleSubmit}>
  //     <div className="image-form">
  //       <input id="image-upload" type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
  //       <label htmlFor="image-upload" className="upload-button">
  //         <span>Select image</span>
  //       </label>
  //     </div>
  //     <div className="article-description">
  //       <textarea
  //         rows={3}
  //         placeholder="Caption"
  //         value={description}
  //         onChange={(e) => setDescription(e.target.value)}
  //       />
  //     </div>
  //     <div className="article-form-button">
  //       <button type="submit">Create a Post</button>
  //     </div>
  //   </form>
  //   <ToastContainer />
  // </div>
  return (
    <div class="w-full max-w-sm">
      <div class="flex items-center border-b border-amber-400 py-2">
        <input class="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Caption"/>
        <button class="flex-shrink-0 border-transparent border-4 text-amber-400 hover:text-amber-600 text-sm py-1 px-2 rounded" type="button">
        Upload picture
          </button>
          <button class="flex-shrink-0 bg-amber-400 hover:bg-amber-600 border-amber-400 hover:border-amber-600 text-sm border-4 text-white py-1 px-2 rounded" type="button">
            Post
          </button>
      </div>
    </div>
  );
}

export default NewPost;
