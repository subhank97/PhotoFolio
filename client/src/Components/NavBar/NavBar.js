import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ImInstagram } from 'react-icons/im';
import { FaUserCircle } from 'react-icons/fa';

function NavBar({ user, setUser, setPosts }) {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogoutClick = () => {
    setIsLoggingOut(true);
    fetch("/users/sign_out.json", {
      method: "DELETE",
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Credentials': 'true'
      }
    })
      .then((response) => {
        if (response.ok) {
          setUser(null);
          setPosts([]); 
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("Error logging out:", error);
      })
      .finally(() => {
        setIsLoggingOut(false);
      });
  };

  const renderAuthButton = () => {
    if (isLoggingOut) {
      return (
        <button className="navbar-link" disabled>
          Logging Out...
        </button>
      );
    } else if (user !== null) {
      return (
        <div className="flex items-center">
          <div className="relative inline-block ml-4">
            <button className="navbar-link">
              <FaUserCircle size={24} />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
              <NavLink to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                Profile
              </NavLink>
              <button className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100" onClick={handleLogoutClick}>
                Logout
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex items-center ml-auto">
          <NavLink to="/login" className="navbar-link">
            Login
          </NavLink>
          <NavLink to="/signup" className="navbar-link ml-4">
            Sign Up
          </NavLink>
        </div>
      );
    }
  };

  return (
    <nav className="flex items-center justify-between bg-blue-500 p-4">
      <NavLink to="/" className="text-white">
        <ImInstagram size={50} />
      </NavLink>
      <div className="flex items-center">
        {renderAuthButton()}
      </div>
    </nav>
  );
}

export default NavBar;
