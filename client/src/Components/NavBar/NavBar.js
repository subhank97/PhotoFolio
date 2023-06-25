import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar({ user, handleLogoutClick }) {

  return (
    <nav className="w-0 border-l-8 border-amber-300 text-lg font-bold right-0 space-y-5 fixed h-screen bg-black overflow-hidden transition-all duration-300 ease-in-out hover:w-40 hover:border-none" style={{ zIndex: '9999' }}>
      <div className='mx-10 my-40'>
        <NavLink to="/" className="text-white block hover:text-amber-300 transition-colors">
          Gallery
        </NavLink>
        {user && (
          <NavLink to="/profile" className="pt-10 text-white block hover:text-amber-300 transition-colors">
            Profile
          </NavLink>
        )}
        <NavLink to="#" className="pt-10 text-white block hover:text-amber-300 transition-colors">
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
  );
}

export default NavBar;