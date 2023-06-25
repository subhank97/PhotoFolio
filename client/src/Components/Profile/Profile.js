import React from 'react';
import NewPost from './NewPost';
import PostList from './PostList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Profile.css';

function Profile({ comments, user, posts, setPosts, handleLogoutClick }) {

  const postCount = posts.length
  const commentCount = comments.length


  if (!user) {
    return <div>Please log in</div>;
  }

  return (
    <main class="h-full pt-60 bg-slate-950 text-white">
      <section class="relative block h-500-px">
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          style={{ transform: "translateZ(0px)" }}
        />
      </section>
      <section class="relative py-16 bg-blueGray-200">
        <div class="container mx-auto px-4">
          <div class="relative flex flex-col min-w-0 break-words bg-slate-900 w-full mb-6 rounded-lg -mt-64">
            <div class="px-6">
              <div class="flex flex-wrap justify-center">
                <div class="w-full lg:r-0 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div class="py-6 px-3 mt-32 sm:mt-0">
                    <button onClick={handleLogoutClick} class="bg-amber-400 active:bg-amber-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                      Logout
                    </button>
                  </div>
                </div>
              </div>
              <div class="text-center mt-1">
                <h3 class="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                  {user.full_name}
                </h3>
                <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  New York, NY
                </div>
              </div>
              <div class="w-full lg:order-1">
                <div class="flex justify-center py-4 pl-8 lg:pt-4">
                  <div class="mr-4 p-3 text-center">
                    <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span><span class="text-sm text-blueGray-400">Friends</span>
                  </div>
                  <div class="mr-4 p-3 text-center">
                    <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{postCount}</span><span class="text-sm text-blueGray-400">Photos</span>
                  </div>
                  <div class="lg:mr-4 p-3 text-center">
                    <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{commentCount}</span><span class="text-sm text-blueGray-400">Comments</span>
                  </div>
                </div>
              </div>
              <div className="create-post">
                <NewPost user={user} setProfilePosts={setPosts} />
              </div>
              <div class="mt-1 py-5 border-t border-blueGray-200 text-center">
                <div>
                  <div>
                    {posts && posts.length > 0 ? (
                      <>
                        <PostList posts={posts} user={user} updatePosts={setPosts} />
                      </>
                    ) : (
                      <p>No posts yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main >
  );
  {/* <div className="profile">
      <h1>{user.full_name ? ` ${user.full_name}` : ''}</h1>
      <br />
      <div className="create-post">
        <NewPost user={user} setProfilePosts={setPosts} />
      </div>
      <br />
      <div className="your-posts">
        {posts && posts.length > 0 ? (
          <>
            <h4>Your Posts</h4>
            <PostList posts={posts} user={user} updatePosts={setPosts} />
          </>
        ) : (
          <p>No posts yet.</p>
        )}
      </div>
      <ToastContainer />
    </div> */}
}

export default Profile;
