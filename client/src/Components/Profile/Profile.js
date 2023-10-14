import React from 'react';
import NewPost from './NewPost';
import PostList from './PostList';
import 'react-toastify/dist/ReactToastify.css';

function Profile({ comments, user, posts, setPosts, handleLogoutClick }) {

  const postCount = posts.length
  const commentCount = comments.length


  if (!user) {
    return <div>Please log in</div>;
  }

  return (
    <main className="h-auto min-h-screen pt-10 bg-slate-950 text-white">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-slate-900 w-full rounded-lg">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:r-0 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <button onClick={handleLogoutClick} className="bg-amber-400 active:bg-amber-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                      Logout
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-center mt-1">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                  {user.full_name}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  New York, NY
                </div>
              </div>
              <div className="w-full lg:order-1">
                <div className="flex justify-center py-4 pl-8 lg:pt-4">
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span><span className="text-sm text-blueGray-400">Friends</span>
                  </div>
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{!postCount ? 0 : postCount}</span><span className="text-sm text-blueGray-400">{postCount === 1 ? "Post" : "Posts"}</span>
                  </div>
                  <div className="lg:mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{!commentCount ? 0 : commentCount}</span><span className="text-sm text-blueGray-400">{commentCount === 1 ? "Comment" : "Comments"}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <NewPost user={user} setProfilePosts={setPosts} />
              </div>
              <div className="mt-1 py-5 border-t border-blueGray-200 text-center">
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
    </main >
  );
}

export default Profile;
