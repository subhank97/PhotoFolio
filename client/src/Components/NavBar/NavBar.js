import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ImInstagram } from 'react-icons/im';
import './Navbar.css';

function NavBar({ user, setUser, setPosts }) {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogoutClick = () => {
    setIsLoggingOut(true);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/logout`, {
      method: "DELETE",
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
        <>
          <NavLink to="/profile" className="navbar-link">
            Profile
          </NavLink>
          <button className="navbar-link" onClick={handleLogoutClick}>
            Logout
          </button>
        </>
      );
    } else {
      return (
        <>
          <NavLink to="/login" className="navbar-link">
            Login
          </NavLink>
        </>
      );
    }
  };

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-logo">
        <ImInstagram size={50} />
      </NavLink>
      <div className="navbar-menu">
        {renderAuthButton()}
      </div>
    </nav>
  );
}

export default NavBar;
