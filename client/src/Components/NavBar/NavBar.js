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

  return (
    <nav className="w-0 border-l-8 border-amber-300 text-lg font-bold right-0 space-y-5 fixed h-screen bg-black overflow-hidden transition-all duration-300 ease-in-out hover:w-40 hover:border-none">
      <div className='mx-10 my-40'>
        <NavLink to="/gallery" className="text-white block hover:text-amber-300 transition-colors">
          Gallery
        </NavLink>
        <NavLink to="/about-us" className="pt-10 text-white block hover:text-amber-300 transition-colors">
          About Us
        </NavLink>
        <NavLink to="/login" className="pt-10 text-white block hover:text-amber-300 transition-colors">
          {user ? 'Logout' : 'Login'}
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;