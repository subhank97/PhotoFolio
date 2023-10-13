import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function NewPost({ user, setProfilePosts }) {

  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState('');
  const [isImageSelected, setIsImageSelected] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      toast.success('Image selected');
      setIsImageSelected(true);
    } else {
      setIsImageSelected(false);
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
          //console.log('New post:', newPost);
          setProfilePosts((prevPosts) => {
            if (Array.isArray(prevPosts)) {
              return [newPost, ...prevPosts];
            } else {
              //console.error('prevPosts is not an array:', prevPosts);
              return [newPost];
            }
          });
          setIsImageSelected(false)
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
    <form onSubmit={handleSubmit} className="w-full max-w-sm">
      <div className="flex items-center border-amber-400 h-14 px-1">
        <input
          className="appearance-none bg-transparent border-none w-full text-white mr-3 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Caption"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <label
            htmlFor="image-upload"
            className="flex-shrink-0 border-transparent border-4 text-amber-400 hover:text-amber-600 text-sm py-1 px-2 rounded cursor-pointer"
          >
            <p>{!isImageSelected ? "Select image" : ""}</p>
          </label>
        </div>
        <button
          className={`flex-shrink-0 text-md py-1 px-5 rounded ${isImageSelected ? 'bg-amber-600 border-amber-600' : 'bg-gray-400 opacity-25 cursor-default'
            } text-white hover:border-amber-600`}
          type="submit"
        >
          Post
        </button>
      </div>
      <ToastContainer className="toast-container" toastClassName="bg-yellow-400 text-black" />
    </form>
  );
}

export default NewPost;
