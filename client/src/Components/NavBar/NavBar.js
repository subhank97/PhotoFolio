import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { GrGallery } from 'react-icons/gr'

function NavBar({ user, handleLogoutClick }) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="relative">
      <button 
        onClick={toggleNav} 
        className="opacity-25	fixed top-2 right-4 z-50 p-2 bg-black text-gray-200 rounded-full border-2	 border-gray-200 hover:text-amber-300 hover:border-amber-300 hover:opacity-100"
      >
        {isNavOpen ? 'Collapse >>' : 'Expand <<'}
      </button>
      <nav className={`${isNavOpen ? 'w-40' : 'w-0'} border-l-8 border-amber-300 text-lg font-bold right-0 space-y-3 fixed h-screen bg-black overflow-hidden transition-all duration-300 ease-in-out`} style={{ zIndex: '10' }}>
        <div className='mx-5 my-40'>
          <NavLink to="/gallery" className="text-white block hover:text-amber-300 transition-colors">
            Gallery
          </NavLink>
          {user && (
            <NavLink to="/profile" className="pt-10 text-white block hover:text-amber-300 transition-colors">
              Profile
            </NavLink>
          )}
          <NavLink to="/" className="pt-10 text-white block hover:text-amber-300 transition-colors">
            About Us
          </NavLink>
          {user ? (
            <button onClick={handleLogoutClick} className="pt-10 text-white block hover:text-amber-300 transition-colors">
              Logout
            </button>
          ) : (
            <NavLink to="/login" className="pt-10 text-white block hover:text-amber-300 transition-colors">
              Login
            </NavLink>
          )}
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
